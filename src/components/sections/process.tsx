import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHead } from "@/components/ui/section-head";
import { processSteps } from "@/configs/app.config";

export function Process() {
  return (
    <Section>
      <SectionHead
        eyebrow="Como trabalhamos"
        title={
          <>
            Diagnóstico claro.
            <br />
            Zero surpresas.
          </>
        }
        lead="Cada serviço passa por quatro etapas — você sabe exatamente o que está sendo feito, com qual peça, em quanto tempo. É assim que a gente entrega confiança, não só conserto."
      />

      <div className="mt-16 grid border-t border-line-strong sm:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((step, idx) => (
          <Reveal
            key={step.id}
            delay={(idx + 1) as 1 | 2 | 3 | 4}
            className="relative border-b border-line py-7 pr-4 last:border-b-0 sm:border-b-0 sm:border-r sm:py-8 sm:pr-7 sm:even:border-r-0 xl:border-r xl:last:border-r-0"
          >
            <span
              className="absolute left-0 top-[-1px] h-px w-8 bg-accent"
              aria-hidden="true"
            />
            <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.15em] text-accent">
              {step.id} — {step.phase}
            </p>
            <h4 className="mb-2 font-display text-[20px] font-semibold tracking-[-0.02em]">
              {step.title}
            </h4>
            <p className="text-sm leading-[1.5] text-fg-2">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
