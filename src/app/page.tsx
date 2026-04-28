
import type { Metadata } from "next";

import { HomeLanding } from "@/components/landing/home-landing";
import { companyInfo } from "@/configs/app.config";

const siteUrl = "https://suportideal.com.br";

export const metadata: Metadata = {
  title: "Suport Ideal | Assistencia Tecnica em Tapira e Araxa",
  description:
    "Assistencia tecnica de celulares e computadores com diagnostico transparente, garantia de 90 dias e atendimento rapido via WhatsApp.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Suport Ideal | Solucoes em tecnologia com confianca",
    description:
      "Troca de tela, bateria, formatacao, montagem de PC e manutencao especializada em Tapira e Araxa.",
    url: siteUrl,
    type: "website",
    locale: "pt_BR",
  },
};

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyInfo.name,
    telephone: companyInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
      addressLocality: companyInfo.city,
      addressRegion: companyInfo.region,
      postalCode: companyInfo.postalCode,
      addressCountry: "BR",
    },
    areaServed: companyInfo.servedCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    foundingDate: companyInfo.established,
    sameAs: [companyInfo.instagram],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomeLanding />
    </>
  );
}
