/**
 * Integração com a API pública de formulários do Cognizy.
 * Endpoint genérico: POST /api/public/forms/:slug/submit
 */

const COGNIZY_BASE_URL = "https://api.cognizy.ai/api/public/forms";

const FORM_SLUGS = {
  QUOTE: "solicitacao-de-orcamento",
  PC_BUILD_BRIEFING: "briefing-montagem-pc",
} as const;

export interface QuoteSubmissionPayload {
  nome: string;
  sobrenome: string;
  telefone: string;
  servico: string;
  tipo: string;
  marca: string;
  modelo: string;
  cidade: string;
  endereco: string;
  observacao: string;
  /** Honeypot anti-bot — sempre vazio quando humano. */
  _hp: string;
}

export interface PcBuildBriefingPayload {
  nome: string;
  sobrenome: string;
  telefone: string;
  escopo: string;
  finalidade: string;
  "jogos-programas": string;
  resolucao: string;
  fps: string;
  orcamento: string;
  prazo: string;
  "pecas-que-possui": string;
  "itens-ja-tem": string;
  "itens-a-incluir": string;
  estilo: string;
  "preferencia-marca": string;
  observacao: string;
  _hp: string;
}

export interface CognizySubmissionResult {
  submissionId: string;
}

export class CognizySubmissionError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "CognizySubmissionError";
  }
}

async function postToCognizy<T>(slug: string, payload: T): Promise<CognizySubmissionResult> {
  const response = await fetch(`${COGNIZY_BASE_URL}/${slug}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let details: unknown;
    try {
      details = await response.json();
    } catch {
      details = await response.text().catch(() => null);
    }
    throw new CognizySubmissionError(
      `Cognizy form submission failed (${response.status})`,
      response.status,
      details,
    );
  }

  return (await response.json()) as CognizySubmissionResult;
}

export function submitQuoteForm(payload: QuoteSubmissionPayload) {
  return postToCognizy(FORM_SLUGS.QUOTE, payload);
}

export function submitPcBuildBriefing(payload: PcBuildBriefingPayload) {
  return postToCognizy(FORM_SLUGS.PC_BUILD_BRIEFING, payload);
}
