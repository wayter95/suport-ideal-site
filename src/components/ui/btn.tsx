import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type BtnVariant = "primary" | "ghost";
type BtnSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full border font-semibold tracking-[-0.005em] transition-[transform,background,color,box-shadow,border-color] duration-300 ease-[var(--ease-out)]";

const sizes: Record<BtnSize, string> = {
  md: "px-5 py-3 text-[15px] leading-snug max-sm:whitespace-normal max-sm:text-center sm:whitespace-nowrap sm:px-[22px] sm:py-[14px]",
  lg: "px-5 py-3.5 text-sm leading-snug max-sm:min-h-11 max-sm:whitespace-normal max-sm:text-center sm:px-7 sm:py-[18px] sm:text-base sm:leading-normal sm:whitespace-nowrap",
};

const variants: Record<BtnVariant, string> = {
  primary:
    "border-transparent bg-accent text-black shadow-[0_0_0_0_var(--color-accent-glow),0_12px_40px_-10px_var(--color-accent-glow)] hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_var(--color-accent-glow),0_18px_48px_-10px_var(--color-accent-glow)]",
  ghost:
    "border-white/26 bg-transparent text-fg hover:border-fg hover:bg-white/[0.04]",
};

export interface BtnProps {
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  children: ReactNode;
}

type AnchorProps = BtnProps & ComponentPropsWithoutRef<typeof Link>;

export function Btn({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: AnchorProps) {
  return (
    <Link
      {...rest}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}

export function BtnArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
