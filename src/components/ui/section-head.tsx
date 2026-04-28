import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
}

/**
 * Replica `.section-head` do styles.css — grid 1fr 1fr com h2 grande
 * à esquerda e parágrafo lead à direita, alinhados pela base.
 * Em telas <800px vira coluna única.
 */
export function SectionHead({ eyebrow, title, lead }: SectionHeadProps) {
  return (
    <Reveal className="mb-4 grid items-start gap-6 md:grid-cols-2 md:items-end md:gap-12">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(32px,5.5vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em] sm:mt-5 sm:text-[clamp(40px,5.5vw,80px)]">
          {title}
        </h2>
      </div>
      <p className="max-w-[48ch] text-[clamp(16px,1.4vw,20px)] leading-[1.5] text-fg-2 md:text-[clamp(17px,1.4vw,20px)]">
        {lead}
      </p>
    </Reveal>
  );
}
