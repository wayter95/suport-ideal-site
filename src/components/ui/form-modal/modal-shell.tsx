"use client";

import { useEffect, type ReactNode } from "react";

export interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  /** id usado em aria-labelledby — quem renderizar o título deve usar esse id */
  titleId: string;
  /** largura máxima opcional; default sm:max-w-lg */
  size?: "md" | "lg" | "xl";
  children: ReactNode;
}

const sizeClass: Record<NonNullable<ModalShellProps["size"]>, string> = {
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function ModalShell({ open, onClose, titleId, size = "lg", children }: ModalShellProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className={`relative w-full ${sizeClass[size]} rounded-lg border border-line bg-bg-elev p-6 shadow-2xl sm:p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-3 transition-colors hover:border-line-strong hover:text-fg"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
