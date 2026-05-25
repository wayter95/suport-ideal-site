"use client";

import { useMemo, useState, type ReactNode } from "react";

import { BtnArrow } from "@/components/ui/btn";

export interface WizardStep {
  /** Identificador estável (usado para keys e debugging). */
  id: string;
  /** Título exibido no topo do step. */
  title: string;
  /** Subtítulo opcional abaixo do título. */
  subtitle?: string;
  /** Conteúdo do step (campos do form). */
  content: ReactNode;
  /**
   * Validação síncrona ao tentar avançar.
   * Retornar `string` exibe a mensagem de erro; `null`/`undefined` libera a navegação.
   */
  validate?: () => string | null | undefined;
}

export interface FormWizardProps {
  steps: ReadonlyArray<WizardStep>;
  /** Texto curto exibido no canto superior (ex: "Briefing — Montagem de PC"). */
  eyebrow?: string;
  /** Disparado no último step quando o usuário aciona "Enviar". */
  onSubmit: () => void | Promise<void>;
  /** Label do botão final (default: "Enviar"). */
  submitLabel?: string;
  /** Quando true, desabilita botões e mostra "Enviando…". */
  submitting?: boolean;
  /** Renderizado entre o conteúdo e os botões (ex: mensagem de erro de envio). */
  footerSlot?: ReactNode;
  /** Disparado quando o usuário cancela (Esc/X já tratados pelo ModalShell). */
  onCancel?: () => void;
}

export function FormWizard({
  steps,
  eyebrow,
  onSubmit,
  submitLabel = "Enviar",
  submitting = false,
  footerSlot,
  onCancel,
}: FormWizardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepError, setStepError] = useState<string | null>(null);

  const total = steps.length;
  const safeIndex = Math.min(activeIndex, total - 1);
  const current = steps[safeIndex];
  const isLast = safeIndex === total - 1;
  const isFirst = safeIndex === 0;

  const progressPct = useMemo(
    () => (total <= 1 ? 100 : Math.round(((safeIndex + 1) / total) * 100)),
    [safeIndex, total],
  );

  const handleNext = async () => {
    const error = current.validate?.();
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);
    if (isLast) {
      await onSubmit();
      return;
    }
    setActiveIndex((i) => Math.min(i + 1, total - 1));
  };

  const handleBack = () => {
    setStepError(null);
    setActiveIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <div className="flex flex-col">
      {/* Cabeçalho: eyebrow + indicador de passo + barra de progresso */}
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          {eyebrow && (
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-3">
              {eyebrow}
            </p>
          )}
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-3">
            Passo {safeIndex + 1} de {total}
          </p>
        </div>
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPct}
        >
          <div
            className="h-full bg-accent transition-[width] duration-400 ease-[var(--ease-out)]"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Título do step */}
      <h2 className="mb-2 font-display text-[clamp(20px,2vw,26px)] font-semibold leading-[1.1] tracking-[-0.02em]">
        {current.title}
      </h2>
      {current.subtitle && (
        <p className="mb-6 text-[14px] leading-[1.5] text-fg-2">{current.subtitle}</p>
      )}

      {/* Conteúdo do step (com fade ao trocar) */}
      <div key={current.id} className="flex animate-[fade-in_240ms_ease-out] flex-col gap-4">
        {current.content}
      </div>

      {stepError && (
        <p
          role="alert"
          className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] leading-[1.45] text-red-300"
        >
          {stepError}
        </p>
      )}

      {footerSlot}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          {!isFirst && (
            <button
              type="button"
              onClick={handleBack}
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-fg-2 transition-colors hover:border-fg hover:text-fg disabled:cursor-not-allowed disabled:opacity-50"
            >
              Voltar
            </button>
          )}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-3 text-sm font-semibold text-fg-3 transition-colors hover:text-fg disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={handleNext}
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-transparent bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_0_0_0_var(--color-accent-glow),0_12px_40px_-10px_var(--color-accent-glow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_var(--color-accent-glow),0_18px_48px_-10px_var(--color-accent-glow)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {submitting ? "Enviando…" : isLast ? submitLabel : "Próximo"}
          {!submitting && <BtnArrow />}
        </button>
      </div>
    </div>
  );
}
