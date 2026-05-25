"use client";

import { useState } from "react";

import { Btn, BtnArrow } from "@/components/ui/btn";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PcBuildBriefingModal } from "@/components/ui/pc-build-briefing-modal";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { pcBuildSteps } from "@/configs/app.config";

export function PcBuild() {
  const [briefingOpen, setBriefingOpen] = useState(false);

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
            <button
              type="button"
              onClick={() => setBriefingOpen(true)}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-transparent bg-accent px-7 py-[18px] text-base font-semibold tracking-[-0.005em] text-black shadow-[0_0_0_0_var(--color-accent-glow),0_12px_40px_-10px_var(--color-accent-glow)] transition-[transform,background,color,box-shadow,border-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_var(--color-accent-glow),0_18px_48px_-10px_var(--color-accent-glow)] max-sm:min-h-11 max-sm:whitespace-normal max-sm:px-5 max-sm:py-3.5 max-sm:text-center max-sm:text-sm"
            >
              Pedir orçamento
              <BtnArrow />
            </button>
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

      <PcBuildBriefingModal open={briefingOpen} onClose={() => setBriefingOpen(false)} />
    </Section>
  );
}
