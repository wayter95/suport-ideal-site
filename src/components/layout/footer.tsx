import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { companyInfo, footerColumns, whatsappLink } from "@/configs/app.config";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg pt-14 pb-8 sm:pt-20">
      <Container>
        <div className="mb-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Coluna brand */}
          <div>
            <Image
              src="/images/logo-white.svg"
              alt={companyInfo.name}
              width={148}
              height={42}
              className="h-[42px] w-auto"
              style={{ width: "auto", height: "auto" }}
            />
            <p className="mt-6 max-w-[36ch] text-sm leading-[1.5]">{companyInfo.tagline}</p>
            <div className="mt-6 flex gap-2">
              <Link
                href={companyInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </Link>
              <Link
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Colunas dinâmicas */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg-3">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-2 transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Coluna Contato */}
          <div>
            <h5 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg-3">
              Contato
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm text-fg-2">
              <li>
                <Link
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-accent"
                >
                  {companyInfo.phone}
                </Link>
              </li>
              <li>
                <Link
                  href={companyInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-accent"
                >
                  @suport.ideal
                </Link>
              </li>
              <li>Tapira — MG</li>
              <li>Araxá — MG</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-fg-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:text-[11px] sm:tracking-[0.1em]">
          <span className="break-words">© 2026 SUPORT IDEAL TECNOLOGIA</span>
          <span className="max-w-prose break-words sm:max-w-none sm:text-right">
            SOLUÇÕES EM TECNOLOGIA · TAPIRA / ARAXÁ — MG
          </span>
        </div>
      </Container>
    </footer>
  );
}
