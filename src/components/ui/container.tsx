import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Largura máxima de 1280px (token --max-width-page) centralizada,
 * com gutter progressivo (16px → 28px). Usado em todas as seções
 * exceto o marquee de marcas (full-bleed).
 */
export function Container({
  children,
  as: Tag = "div",
  className = "",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-page px-4 sm:px-6 md:px-8 lg:px-gutter ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
