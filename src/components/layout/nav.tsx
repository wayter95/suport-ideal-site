import Image from "next/image";
import Link from "next/link";

import { companyInfo, navigationLinks, whatsappLink } from "@/configs/app.config";

export function Nav() {
  return (
    <nav className="fixed left-1/2 top-3 z-50 flex w-[calc(100%-20px)] max-w-[880px] -translate-x-1/2 items-center justify-between gap-1.5 rounded-full border border-line bg-[rgba(10,10,10,0.7)] py-1.5 pl-3 pr-1.5 backdrop-blur-[20px] backdrop-saturate-[1.4] sm:top-4 sm:w-[calc(100%-32px)] sm:gap-2 sm:py-2 sm:pl-5 sm:pr-2">
      <Link
        href="#hero"
        className="flex min-w-0 shrink items-center gap-1.5 font-display text-sm font-semibold tracking-[-0.02em] sm:gap-2 sm:text-base"
        aria-label={companyInfo.name}
      >
        <Image
          src="/images/logo-white.svg"
          alt=""
          width={120}
          height={24}
          className="h-auto w-[96px] sm:w-[120px]"
          priority
        />
      </Link>

      <div className="hidden items-center gap-1 md:flex">
        {navigationLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-3.5 py-2 text-sm text-fg-2 transition-colors duration-200 hover:bg-white/[0.06] hover:text-fg"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Link
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-full bg-accent px-3 py-2 text-xs font-semibold text-black sm:px-3.5 sm:text-[13px]"
      >
        Orçamento
      </Link>
    </nav>
  );
}
