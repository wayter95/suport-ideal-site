import Link from "next/link";

import { MapCard } from "@/components/sections/map-card";
import { Btn, BtnArrow } from "@/components/ui/btn";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHead } from "@/components/ui/section-head";
import { companyInfo, whatsappLink } from "@/configs/app.config";

const ContactRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-[auto_1fr] items-center gap-x-[18px] gap-y-4 border-b border-line py-4 last:border-b-0">
    <span className="grid size-10 place-items-center rounded-full border border-accent/25 bg-accent/8 text-accent">
      {icon}
    </span>
    <span className="flex flex-col gap-0.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-3">
        {label}
      </span>
      <span className="break-words text-base font-medium text-fg">{children}</span>
    </span>
  </div>
);

export function Contact() {
  const fullAddress = `${companyInfo.address}, ${companyInfo.city}, ${companyInfo.region}, ${companyInfo.postalCode}`;

  return (
    <Section id="contato">
      <SectionHead
        eyebrow="Estamos por perto"
        title={
          <>
            Vamos
            <br />
            conversar?
          </>
        }
        lead="Resposta em até 10 minutos no WhatsApp em horário comercial. Você pode também passar na loja — a gente toma um café enquanto cuida do seu aparelho."
      />

      <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-5 rounded-lg border border-line bg-bg-elev p-6 sm:p-8 lg:p-10">
          <ContactRow
            label="WhatsApp / Telefone"
            icon={
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z" />
              </svg>
            }
          >
            <Link
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              {companyInfo.phone}
            </Link>
          </ContactRow>

          <ContactRow
            label="Endereço"
            icon={
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          >
            {companyInfo.address}
            <br />
            {companyInfo.city} — {companyInfo.region} · {companyInfo.postalCode}
          </ContactRow>

          <ContactRow
            label="Atendimento"
            icon={
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            }
          >
            {companyInfo.openingHours.split("\n").map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </ContactRow>

          <ContactRow
            label="Instagram"
            icon={
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            }
          >
            <Link
              href={companyInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              @suport.ideal
            </Link>
          </ContactRow>

          <Btn
            href={whatsappLink("Olá! Quero iniciar um orçamento")}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="group mt-2 self-start"
          >
            Iniciar atendimento
            <BtnArrow />
          </Btn>
        </Reveal>

        <MapCard
          fullAddress={fullAddress}
          shortAddress={companyInfo.address}
          caption={`Suport Ideal · ${companyInfo.city}-${companyInfo.region}`}
          coords={companyInfo.coords}
        />
      </div>
    </Section>
  );
}
