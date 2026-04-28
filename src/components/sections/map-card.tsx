"use client";

import { useMapDeeplink } from "@/hooks/use-map-deeplink";

interface MapCardProps {
  fullAddress: string;
  shortAddress: string;
  caption: string;
  coords?: { lat: number; lng: number };
}

export function MapCard({ fullAddress, shortAddress, caption, coords }: MapCardProps) {
  const open = useMapDeeplink({ address: fullAddress, coords });

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Abrir no app de mapas"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      className="relative min-h-[300px] cursor-pointer overflow-hidden rounded-lg border border-line bg-bg-elev transition-colors duration-300 hover:border-accent sm:min-h-[380px] lg:min-h-[460px]"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234.43782458943323!2d-46.82099381721791!3d-19.92418597874734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b101dc627e26ef%3A0x374cc18e35234734!2sSuport%20Ideal%20Assist%C3%AAncia%20T%C3%A9cnica!5e0!3m2!1spt-BR!2sbr!4v1777347371263!5m2!1spt-BR!2sbr"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        title="Localização Suport Ideal"
        className="pointer-events-none absolute inset-0 size-full border-0 filter-[invert(0.92)_hue-rotate(180deg)_saturate(0.7)]"
      />
      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-md border border-line-strong bg-black/85 px-4 py-3 text-sm backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
        <div className="min-w-0">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-3 sm:text-[11px]">
            {caption}
          </p>
          <p className="break-words font-semibold text-fg">{shortAddress}</p>
        </div>
        <span className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-accent px-3 py-2 text-[11px] font-semibold tracking-[0.02em] text-black sm:self-auto sm:px-3.5 sm:text-[12px]">
          Abrir no Maps
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
      </div>
    </div>
  );
}
