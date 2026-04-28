import { Btn, BtnArrow } from "@/components/ui/btn";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { whatsappLink } from "@/configs/app.config";

export function Hero() {
  return (
    <header
      id="hero"
      className="relative isolate flex flex-1 items-center overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-32 md:pb-14"
    >
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 -z-20 overflow-hidden bg-black">
        <video
          className="size-full object-cover [filter:contrast(1.05)_saturate(0.85)_brightness(0.85)]"
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
      {/* Overlay — escurece o vídeo para contraste do conteúdo */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <Container className="relative z-10">
        <Reveal className="mb-7 flex flex-wrap items-center gap-4">
          <Chip withDot>Atendendo Tapira & Araxá — MG</Chip>
          <Chip className="font-mono text-[11px]! tracking-[0.12em] uppercase">
            EST. 2021 · 5 ANOS DE MERCADO
          </Chip>
        </Reveal>

        <Reveal delay={1}>
          <h1 className="m-0 mb-6 max-w-[16ch] break-words font-display text-[clamp(36px,7vw,112px)] font-semibold leading-[0.92] tracking-[-0.045em] sm:mb-8 sm:text-[clamp(44px,7vw,112px)]">
            Tecnologia que
            <br />
            <em className="not-italic accent-gradient-text">resolve</em>, com
            <br />
            transparência.
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p className="mb-8 max-w-[52ch] text-[clamp(15px,1.3vw,19px)] leading-normal text-fg-2">
            Diagnóstico preciso, peças confiáveis e garantia de 90 dias. Da troca de tela ao
            setup gamer dos sonhos — a Suport Ideal entrega o serviço que sua tecnologia merece.
          </p>
        </Reveal>

        <Reveal delay={3} className="flex flex-wrap gap-3.5">
          <Btn
            href={whatsappLink("Olá! Gostaria de um orçamento")}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="group"
          >
            Solicitar orçamento
            <BtnArrow />
          </Btn>
          <Btn href="#servicos" variant="ghost" size="lg">
            Ver serviços
          </Btn>
        </Reveal>
      </Container>
    </header>
  );
}
