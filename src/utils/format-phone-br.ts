/**
 * Aplica máscara de telefone brasileiro com DDD.
 * Suporta fixo (10 dígitos: `(34) 3333-4444`) e celular (11 dígitos: `(34) 99999-9999`).
 * Aceita entrada parcial — formata progressivamente conforme o usuário digita.
 */
export function formatPhoneBR(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Telefone BR válido tem 10 (fixo) ou 11 (celular) dígitos. */
export function isValidPhoneBR(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

/** Converte para E.164 BR (`+55DDDNNNNNNNNN`). Retorna `null` se inválido. */
export function toE164BR(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length !== 10 && digits.length !== 11) return null;
  return `+55${digits}`;
}
