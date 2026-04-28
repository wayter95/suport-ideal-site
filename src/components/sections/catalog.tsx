import { CatalogCardBackdrop } from "@/components/ui/catalog-card-backdrop";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHead } from "@/components/ui/section-head";
import { catalogCategories } from "@/configs/app.config";

export function Catalog() {
  return (
    <Section id="loja">
      <SectionHead
        eyebrow="Loja Suport Ideal"
        title={
          <>
            Acessórios &
            <br />
            periféricos.
          </>
        }
        lead="Tudo o que sua tecnologia precisa para durar mais e funcionar melhor — com curadoria e o mesmo padrão de qualidade que entregamos no balcão."
      />

      <div className="mt-12 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {catalogCategories.map((cat, idx) => (
          <Reveal
            key={cat.title}
            as="a"
            delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
            className={`group relative flex aspect-[1/1.15] cursor-pointer flex-col justify-end overflow-hidden rounded-lg p-5 transition-[transform,border-color] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 sm:p-6 ${
              cat.highlight
                ? "border border-accent bg-accent-soft"
                : "border border-line bg-bg-elev hover:border-accent"
            }`}
          >
            {/* Fundo: imagem em todos os cards; highlight recebe overlay alaranjado */}
            <CatalogCardBackdrop
              coverSrc={cat.cardCoverSrc}
              imageClassName={cat.highlight ? "opacity-30 saturate-[0.85]" : "opacity-50"}
              overlayClassName={
                cat.highlight
                  ? "bg-[linear-gradient(145deg,rgba(255,106,0,0.55),rgba(255,106,0,0.22)_45%,rgba(0,0,0,0.08))]"
                  : undefined
              }
            />

            <div className="relative flex flex-col gap-4">
              <h4
                className={`font-display text-[22px] font-semibold tracking-[-0.02em] ${cat.highlight ? "text-accent" : ""}`}
              >
                {cat.title}
              </h4>

              <div
                className={`flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.08em] ${cat.highlight ? "text-accent" : "text-fg-3"}`}
              >
                <span>{cat.count}</span>
                {!cat.highlight && (
                  <span className="grid size-7 place-items-center rounded-full border border-line-strong transition-[background,color,border-color] duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                    <svg
                      viewBox="0 0 16 16"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 max-w-full break-words font-mono text-[11px] uppercase leading-relaxed tracking-[0.05em] text-fg-3 sm:text-[12px]">
        → Pagamento via PIX e cartão · Retirada na loja em Tapira ou envio mediante combinação
      </p>
    </Section>
  );
}
