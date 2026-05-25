import { NextResponse } from "next/server";

import {
  CognizySubmissionError,
  submitQuoteForm,
  type QuoteSubmissionPayload,
} from "@/libs/cognizy";
import { toE164BR } from "@/utils/format-phone-br";

export const runtime = "nodejs";

export interface QuoteRequestBody {
  firstName: string;
  lastName: string;
  phone: string;
  service: string;
  equipmentType: string;
  brand: string;
  device: string;
  city: string;
  address: string;
  notes: string;
  /** Honeypot — preenchido por bots, vazio por humanos. */
  hp?: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseBody(raw: unknown): QuoteRequestBody | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Record<string, unknown>;

  if (
    !isNonEmptyString(data.firstName) ||
    !isNonEmptyString(data.lastName) ||
    !isNonEmptyString(data.phone) ||
    !isNonEmptyString(data.service) ||
    !isNonEmptyString(data.equipmentType) ||
    !isNonEmptyString(data.brand)
  ) {
    return null;
  }

  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    phone: data.phone.trim(),
    service: data.service.trim(),
    equipmentType: data.equipmentType.trim(),
    brand: data.brand.trim(),
    device: typeof data.device === "string" ? data.device.trim() : "",
    city: typeof data.city === "string" ? data.city.trim() : "",
    address: typeof data.address === "string" ? data.address.trim() : "",
    notes: typeof data.notes === "string" ? data.notes.trim() : "",
    hp: typeof data.hp === "string" ? data.hp : "",
  };
}

function toCognizyPayload(body: QuoteRequestBody, phoneE164: string): QuoteSubmissionPayload {
  return {
    nome: body.firstName,
    sobrenome: body.lastName,
    telefone: phoneE164,
    servico: body.service,
    tipo: body.equipmentType,
    marca: body.brand,
    modelo: body.device || "—",
    cidade: body.city || "—",
    endereco: body.address || "—",
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
    // Honeypot acionado — fingimos sucesso para não vazar a barreira ao bot.
    return NextResponse.json({ submissionId: "skipped" }, { status: 200 });
  }

  const phoneE164 = toE164BR(body.phone);
  if (!phoneE164) {
    return NextResponse.json({ error: "Telefone inválido" }, { status: 400 });
  }

  try {
    const result = await submitQuoteForm(toCognizyPayload(body, phoneE164));
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof CognizySubmissionError) {
      return NextResponse.json(
        { error: "Falha ao enviar solicitação", details: err.details },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}
