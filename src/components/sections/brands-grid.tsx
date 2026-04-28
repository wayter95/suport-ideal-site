import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHead } from "@/components/ui/section-head";
import { brandsGrid } from "@/configs/app.config";

export function BrandsGrid() {
  return (
    <Section flushTop>
      <SectionHead
        eyebrow="Compatibilidade"
        title={
          <>
            Sua marca,
            <br />
            nossa expertise.
          </>
        }
        lead="Atendemos os principais fabricantes do mercado de smartphones e computadores. Se sua marca não está aqui, fale com a gente — provavelmente atendemos também."
      />

      <Reveal className="mt-12 grid overflow-hidden rounded-lg border border-line bg-line gap-px sm:grid-cols-2 xl:grid-cols-5">
        {brandsGrid.map((brand) => (
          <div
            key={brand.name}
            className="group relative grid min-h-[120px] place-items-center bg-bg-elev px-4 py-8 text-center font-display text-lg font-semibold tracking-[-0.02em] text-fg transition-[background,color] duration-300 hover:bg-accent hover:text-black sm:px-6 sm:py-9 sm:text-[22px]"
          >
            <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-3 transition-colors duration-300 group-hover:text-black/60">
              {brand.sub}
            </span>
            {brand.name}
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
