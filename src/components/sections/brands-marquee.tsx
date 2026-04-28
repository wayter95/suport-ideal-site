import { brandList } from "@/configs/app.config";

export function BrandsMarquee() {
  // Duplicação para loop infinito sem corte
  const items = [...brandList, ...brandList];

  return (
    <section
      className="relative overflow-hidden border-y border-line bg-bg py-7 md:py-10"
      aria-label="Marcas atendidas"
    >
      <p className="mb-5 px-4 text-center font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-fg-3 sm:px-6 sm:text-[11px] sm:tracking-[0.2em] md:mb-6">
        Atendemos as principais marcas do mercado
      </p>
      <div className="flex w-fit gap-12 md:gap-20 animate-[marquee-scroll_30s_linear_infinite]">
        {items.map((brand, idx) => (
          <span
            key={`${brand}-${idx}`}
            className="inline-flex shrink-0 items-center gap-4 whitespace-nowrap font-display text-[clamp(22px,3vw,44px)] font-medium tracking-[-0.03em] text-fg opacity-80 transition-[opacity,color] duration-300 hover:text-accent hover:opacity-100"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
