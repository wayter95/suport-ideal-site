import Image from "next/image";

import { catalogCoverAssetVersion } from "@/configs/app.config";

const GRID_TEXTURE =
  "repeating-linear-gradient(90deg, var(--color-bg-elev-2) 0 1px, transparent 1px 12px), repeating-linear-gradient(0deg, var(--color-bg-elev-2) 0 1px, transparent 1px 12px)";

export type CatalogCardBackdropProps = {
  /** Quando definido, exibe foto de capa em vez do padrão de grade. */
  coverSrc?: string;
};

function coverImageSrcWithVersion(src: string): string {
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}cv=${catalogCoverAssetVersion}`;
}

export function CatalogCardBackdrop({ coverSrc }: CatalogCardBackdropProps) {
  if (coverSrc) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        aria-hidden="true"
      >
        <Image
          src={coverImageSrcWithVersion(coverSrc)}
          alt=""
          fill
          className="object-cover opacity-50"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 opacity-50"
      style={{ background: GRID_TEXTURE }}
      aria-hidden="true"
    />
  );
}
