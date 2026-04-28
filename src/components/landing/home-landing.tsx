import { FloatingWhatsapp } from "@/components/layout/floating-whatsapp";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { AboutTrust } from "@/components/sections/about-trust";
import { BrandsGrid } from "@/components/sections/brands-grid";
import { BrandsMarquee } from "@/components/sections/brands-marquee";
import { Catalog } from "@/components/sections/catalog";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { PcBuild } from "@/components/sections/pc-build";
import { Process } from "@/components/sections/process";
import { Reviews } from "@/components/sections/reviews";
import { Services } from "@/components/sections/services";

export function HomeLanding() {
  return (
    <>
      <Nav />

      {/* Primeira dobra: hero + marquee de marcas em 100svh */}
      <main className="flex min-h-svh flex-col">
        <Hero />
        <BrandsMarquee />
      </main>

      {/* Demais seções — todas usam <Section> com Container 1280 */}
      <Process />
      <Services />
      <BrandsGrid />
      <PcBuild />
      <Catalog />
      <AboutTrust />
      <Reviews />
      <Contact />

      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
