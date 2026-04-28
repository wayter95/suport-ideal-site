import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHead } from "@/components/ui/section-head";
import { trustStats } from "@/configs/app.config";

export function AboutTrust() {
  return (
    <Section
      id="sobre"
      className="bg-[linear-gradient(180deg,var(--color-bg)_0%,var(--color-bg-elev)_50%,var(--color-bg)_100%)]"
    >
      <SectionHead
        eyebrow="Sobre a Suport Ideal"
        title={
          <>
            Cinco anos
            <br />
            cuidando da
            <br />
            tecnologia daqui.
          </>
        }
        lead="Desde 2021, a Suport Ideal nasceu com um propósito claro: trazer atendimento honesto, técnico e premium para Tapira e Araxá. Não somos uma assistência qualquer — somos parceiros de quem depende da própria tecnologia para trabalhar, estudar ou jogar."
      />

      {/* warranty-stamp */}
      <Reveal className="mt-7 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-line-strong py-3 pl-3 pr-4 sm:gap-[18px] sm:pr-6">
        <span className="grid size-[60px] place-items-center rounded-full bg-accent font-display text-[26px] font-bold text-black">
          90
        </span>
        <span className="flex flex-col">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-3">
            Garantia em todo serviço
          </span>
          <span className="text-base font-semibold">
            90 dias por escrito · serviço & peça
          </span>
        </span>
      </Reveal>

      {/* trust-row */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {trustStats.map((stat, idx) => (
          <Reveal
            key={stat.label}
            delay={(idx + 1) as 1 | 2 | 3 | 4}
            className="border-t border-line-strong px-4 py-6 sm:px-6 sm:py-7"
          >
            <p className="mb-4 font-display text-[clamp(36px,4vw,56px)] font-semibold leading-none tracking-[-0.04em]">
              <em className="not-italic text-accent">{stat.big}</em>
              {stat.bigUnit}
            </p>
            <p className="text-sm leading-[1.4] text-fg-2">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
