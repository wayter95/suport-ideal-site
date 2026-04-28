import Link from "next/link";

import { BtnArrow } from "@/components/ui/btn";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHead } from "@/components/ui/section-head";
import { services, whatsappLink, type ServiceSize } from "@/configs/app.config";

const spanByDesktop: Record<ServiceSize, string> = {
  lg: "xl:col-span-8",
  md: "xl:col-span-6",
  sm: "xl:col-span-4",
};
const spanByTablet: Record<ServiceSize, string> = {
  lg: "md:col-span-12",
  md: "md:col-span-6",
  sm: "md:col-span-6",
};
const minHeightByDesktop: Record<ServiceSize, string> = {
  lg: "xl:min-h-[420px]",
  md: "xl:min-h-[320px]",
  sm: "xl:min-h-[320px]",
};

export function Services() {
  return (
    <Section id="servicos" flushTop>
      <SectionHead
        eyebrow="Serviços"
        title={
          <>
            Do reparo
            <br />
            ao upgrade.
          </>
        }
        lead="Mais de duas mil intervenções realizadas. Da tela trincada ao desktop montado do zero — atendemos pessoas, gamers, estudantes e empresas com a mesma seriedade."
      />

      <div className="mt-12 grid auto-rows-fr grid-cols-12 gap-4">
        {services.map((service, idx) => (
          <Reveal
            key={service.id}
            delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
            as="article"
            className={`group col-span-12 flex flex-col overflow-hidden rounded-lg border border-line bg-bg-elev p-6 transition-[transform,border-color,background] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-line-strong sm:p-8 ${spanByTablet[service.size]} ${spanByDesktop[service.size]} ${minHeightByDesktop[service.size]}`}
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-3">
              {service.numLabel}
            </p>
            <h3 className="mb-3 font-display text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.05] tracking-[-0.025em]">
              {service.title}
            </h3>
            <p className="mb-auto text-[15px] leading-[1.55] text-fg-2">
              {service.description}
            </p>
            <div className="mt-6 flex w-full min-w-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={whatsappLink(service.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full min-w-0 items-center justify-center gap-2.5 rounded-full border border-line-strong bg-transparent px-5 py-3.5 text-sm font-semibold text-fg transition-[background,border-color,color] duration-300 hover:border-fg hover:bg-white/[0.04] sm:w-auto sm:justify-start sm:px-[22px] sm:py-[14px] sm:text-[15px]"
              >
                {service.ctaLabel}
                <BtnArrow />
              </Link>
            </div>
          </Reveal>
        ))}

        {/* Card de Garantia (accent) */}
        <Reveal
          delay={4}
          as="article"
          className="col-span-12 flex flex-col rounded-lg border border-transparent bg-accent p-6 text-black sm:p-8 md:col-span-6 xl:col-span-6 xl:min-h-[320px]"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-black/60">
            ★ Garantia
          </p>
          <h3 className="mb-3 font-display text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.05] tracking-[-0.025em] text-black">
            90 dias de tranquilidade
            <br />
            em cada serviço.
          </h3>
          <p className="text-[15px] leading-[1.55] text-black/70">
            Apareceu algo errado relacionado ao reparo? A gente resolve sem custo adicional. É a
            lei — e é como a gente trabalha.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
