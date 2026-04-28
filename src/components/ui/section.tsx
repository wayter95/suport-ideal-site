import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Remove o padding-top (útil para encadear seções sem dobrar espaçamento). */
  flushTop?: boolean;
}

/**
 * Wrapper padrão das seções da landing.
 * Replica `.section` do styles.css original:
 *   padding: clamp(80px, 10vw, 160px) var(--gutter)
 * Conteúdo interno limitado a 1280px e centralizado via Container.
 */
export function Section({
  children,
  id,
  className = "",
  flushTop = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-16 sm:py-[clamp(72px,9vw,140px)] lg:py-[clamp(80px,10vw,160px)] ${flushTop ? "pt-0" : ""} ${className}`.trim()}
    >
      <Container>{children}</Container>
    </section>
  );
}
