import { NextResponse } from "next/server";

import {
  CognizySubmissionError,
  submitPcBuildBriefing,
  type PcBuildBriefingPayload,
} from "@/libs/cognizy";
import { toE164BR } from "@/utils/format-phone-br";

export const runtime = "nodejs";

export interface PcBuildBriefingRequestBody {
  firstName: string;
  lastName: string;
  phone: string;
  scope: string;
  purpose: string;
  purposeOther: string;
  gamesOrSoftware: string;
  resolution: string;
  fps: string;
  budget: string;
  deadline: string;
  partsOwned: string;
  ownedItems: ReadonlyArray<string>;
  includeItems: ReadonlyArray<string>;
  style: string;
  brandPreference: string;
  notes: string;
  hp?: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function parseBody(raw: unknown): PcBuildBriefingRequestBody | null {
  if (!raw || typeof raw !== "object") return null;
  const d = raw as Record<string, unknown>;

  if (
    !isNonEmptyString(d.firstName) ||
    !isNonEmptyString(d.lastName) ||
    !isNonEmptyString(d.phone) ||
    !isNonEmptyString(d.scope)
  ) {
    return null;
  }

  return {
    firstName: d.firstName.trim(),
    lastName: d.lastName.trim(),
    phone: d.phone.trim(),
    scope: d.scope.trim(),
    purpose: asString(d.purpose),
    purposeOther: asString(d.purposeOther),
    gamesOrSoftware: asString(d.gamesOrSoftware),
    resolution: asString(d.resolution),
    fps: asString(d.fps),
    budget: asString(d.budget),
    deadline: asString(d.deadline),
    partsOwned: asString(d.partsOwned),
    ownedItems: asStringArray(d.ownedItems),
    includeItems: asStringArray(d.includeItems),
    style: asString(d.style),
    brandPreference: asString(d.brandPreference),
    notes: asString(d.notes),
    hp: typeof d.hp === "string" ? d.hp : "",
  };
}

function resolvePurpose(body: PcBuildBriefingRequestBody): string {
  if (body.purpose === "Outro" && body.purposeOther) return body.purposeOther;
  return body.purpose;
}

function toCognizyPayload(
  body: PcBuildBriefingRequestBody,
  phoneE164: string,
): PcBuildBriefingPayload {
  return {
    nome: body.firstName,
    sobrenome: body.lastName,
    telefone: phoneE164,
    escopo: body.scope,
    finalidade: resolvePurpose(body) || "—",
    "jogos-programas": body.gamesOrSoftware || "—",
    resolucao: body.resolution || "—",
    fps: body.fps || "—",
    orcamento: body.budget || "—",
    prazo: body.deadline || "—",
    "pecas-que-possui": body.partsOwned || "—",
    "itens-ja-tem": body.ownedItems.length ? body.ownedItems.join(", ") : "—",
    "itens-a-incluir": body.includeItems.length ? body.includeItems.join(", ") : "—",
    estilo: body.style || "—",
    "preferencia-marca": body.brandPreference || "—",
    observacao: body.notes,
    _hp: body.hp ?? "",
  };
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const body = parseBody(raw);
  if (!body) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
  }

  if (body.hp && body.hp.trim().length > 0) {
    return NextResponse.json({ submissionId: "skipped" }, { status: 200 });
  }

  const phoneE164 = toE164BR(body.phone);
  if (!phoneE164) {
    return NextResponse.json({ error: "Telefone inválido" }, { status: 400 });
  }

  try {
    const result = await submitPcBuildBriefing(toCognizyPayload(body, phoneE164));
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof CognizySubmissionError) {
      return NextResponse.json(
        { error: "Falha ao enviar briefing", details: err.details },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}
