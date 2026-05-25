"use client";

import { useEffect, useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export interface UseSubmitStatusOptions {
  /** Quando sucesso, dispara onAutoClose após este intervalo (ms). 0 = desabilitado. */
  autoCloseMs?: number;
  onAutoClose?: () => void;
}

export interface UseSubmitStatusResult {
  status: SubmitStatus;
  error: string | null;
  setStatus: (s: SubmitStatus) => void;
  setError: (e: string | null) => void;
  reset: () => void;
}

/**
 * Hook para gerenciar ciclo de submissão de formulários:
 * idle → submitting → success | error.
 * Suporta auto-close opcional após sucesso.
 */
export function useSubmitStatus(options: UseSubmitStatusOptions = {}): UseSubmitStatusResult {
  const { autoCloseMs = 0, onAutoClose } = options;
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "success" || autoCloseMs <= 0 || !onAutoClose) return;
    const t = window.setTimeout(onAutoClose, autoCloseMs);
    return () => window.clearTimeout(t);
  }, [status, autoCloseMs, onAutoClose]);

  const reset = () => {
    setStatus("idle");
    setError(null);
  };

  return { status, error, setStatus, setError, reset };
}
