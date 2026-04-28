import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  withDot?: boolean;
  className?: string;
}

export function Chip({ children, withDot = false, className = "" }: ChipProps) {
  return (
    <span
      className={`chip-tech inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] leading-snug text-fg sm:text-[13px] ${className}`.trim()}
    >
      {withDot && (
        <span
          className="size-1.5 rounded-full bg-accent animate-[accent-pulse_1.1s_ease-in-out_infinite]"
          style={{ boxShadow: "0 0 8px var(--color-accent)" }}
          aria-hidden="true"
        />
      )}
      <span className="relative z-[1]">{children}</span>
    </span>
  );
}
