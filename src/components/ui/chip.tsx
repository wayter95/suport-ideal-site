import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  withDot?: boolean;
  className?: string;
}

export function Chip({ children, withDot = false, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] leading-snug text-fg-2 sm:text-[13px] ${className}`.trim()}
    >
      {withDot && (
        <span
          className="size-1.5 rounded-full bg-accent"
          style={{ boxShadow: "0 0 8px var(--color-accent)" }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
