import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Replica `.eyebrow` do styles.css — kicker mono com barrinha de 24px
 * antes do texto. Usado nos cabeçalhos de seção.
 */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-accent ${className}`.trim()}
    >
      <span className="inline-block h-px w-6 bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
