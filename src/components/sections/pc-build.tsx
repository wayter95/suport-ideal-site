import { Btn, BtnArrow } from "@/components/ui/btn";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { pcBuildSteps, whatsappLink } from "@/configs/app.config";

export function PcBuild() {
  return (
    <Section
      id="montagem"
      className="overflow-hidden bg-[linear-gradient(180deg,var(--color-bg)_0%,#000_50%,var(--color-bg)_100%)]"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Setup do zero</Eyebrow>
          <h2 className="mb-6 mt-5 font-display text-[clamp(40px,5.5vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Montagem
            <br />
            de PC sob
            <br />
            medida.
          </h2>
          <p className="mb-8 max-w-[48ch] text-[clamp(17px,1.4vw,20px)] leading-[1.5] text-fg-2">
            Da seleção dos componentes ao cable management impecável. Trabalho ou jogos, a gente
            projeta o setup ideal para o seu uso e orçamento.
          </p>

          <div>
            {pcBuildSteps.map((step) => (
              <div
                key={step.id}
                className="grid grid-cols-1 gap-1.5 border-b border-line py-4 font-mono text-[13px] sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-x-6 sm:gap-y-4 sm:py-[18px]"
              >
                <span className="text-[11px] uppercase tracking-[0.1em] text-fg-3 sm:col-auto">
                  {step.id}
                </span>
                <span className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-fg sm:text-base">
                  {step.title}
                </span>
                <span className="text-[11px] uppercase tracking-[0.1em] text-accent sm:text-right">
                  {step.meta}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3.5">
            <Btn
              href={whatsappLink("Olá! Quero orçamento de montagem de PC")}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="group"
            >
              Pedir orçamento
              <BtnArrow />
            </Btn>
            <Btn href="#contato" variant="ghost" size="lg">
              Conversar com técnico
            </Btn>
          </div>
        </Reveal>

        <Reveal
          delay={2}
          className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line-strong bg-black"
        >
          <video
            className="absolute inset-0 size-full object-cover"
            src="/videos/pc-custom.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </Section>
  );
}
