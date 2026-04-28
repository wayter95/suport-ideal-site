import Link from "next/link";

import { whatsappLink } from "@/configs/app.config";

export function FloatingWhatsapp() {
  return (
    <Link
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] z-[80] inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-[18px] py-3.5 pl-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-10px_rgba(37,211,102,0.5)] transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:scale-[1.02] max-sm:p-3.5 max-sm:pr-3.5"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[22px]"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.2.2-.3.2-.6 0-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.4-.5.1-.2.1-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3 4.8 4.2 1.7.7 2.3.8 3.1.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.5 5.1L2 22l5-1.5c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
      <span className="max-sm:hidden">Fale com a gente</span>
    </Link>
  );
}
