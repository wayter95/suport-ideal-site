export interface SuccessPanelProps {
  titleId: string;
  title?: string;
  message?: string;
}

export function SuccessPanel({
  titleId,
  title = "Solicitação enviada!",
  message = "Recebemos seus dados e entraremos em contato o mais rápido possível.",
}: SuccessPanelProps) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <h2
        id={titleId}
        className="mb-2 font-display text-[clamp(20px,2vw,26px)] font-semibold leading-[1.1] tracking-[-0.02em]"
      >
        {title}
      </h2>
      <p className="max-w-sm text-[14px] leading-[1.55] text-fg-2">{message}</p>
    </div>
  );
}
