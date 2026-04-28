import type { CatalogIcon } from "@/configs/app.config";

interface CatalogGlyphProps {
  icon: CatalogIcon;
  size?: number;
}

/**
 * SVGs ilustrativos das categorias da loja, fiéis ao index.html original.
 * Cor controlada via `text-accent` no parent.
 */
export function CatalogGlyph({ icon, size = 56 }: CatalogGlyphProps) {
  const common = {
    viewBox: "0 0 100 100",
    width: size,
    height: size,
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 2,
    "aria-hidden": true,
  };

  switch (icon) {
    case "screen":
      return (
        <svg {...common}>
          <rect x="35" y="15" width="30" height="70" rx="5" />
          <line x1="40" y1="80" x2="60" y2="80" />
        </svg>
      );
    case "charger":
      return (
        <svg {...common}>
          <path d="M30 50 Q50 20 70 50 Q50 80 30 50 Z" />
          <circle cx="50" cy="50" r="6" />
        </svg>
      );
    case "peripherals":
      return (
        <svg {...common}>
          <rect x="20" y="35" width="60" height="35" rx="6" />
          <circle cx="35" cy="52" r="4" />
          <circle cx="50" cy="52" r="4" />
          <circle cx="65" cy="52" r="4" />
        </svg>
      );
    case "cables":
      return (
        <svg {...common}>
          <path d="M30 30 Q30 20 40 20 Q50 20 50 30 L50 70 Q50 80 60 80 Q70 80 70 70" />
          <path d="M30 70 Q30 80 40 80" />
        </svg>
      );
    case "audio":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="20" />
          <path d="M50 30 L50 50 L65 60" />
          <path d="M30 50 Q15 50 15 70" />
          <path d="M70 50 Q85 50 85 70" />
        </svg>
      );
    case "hardware":
      return (
        <svg {...common}>
          <rect x="20" y="25" width="60" height="40" rx="3" />
          <line x1="20" y1="55" x2="80" y2="55" />
          <circle cx="35" cy="40" r="3" fill="currentColor" />
          <circle cx="50" cy="40" r="3" fill="currentColor" />
          <circle cx="65" cy="40" r="3" fill="currentColor" />
        </svg>
      );
    case "gamer":
      return (
        <svg {...common}>
          <path d="M25 40 L75 40 L70 75 L30 75 Z" />
          <path d="M35 40 L35 25 L65 25 L65 40" />
        </svg>
      );
    case "soon":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="35" />
          <path d="M50 35 L50 50 L62 58" />
        </svg>
      );
  }
}
