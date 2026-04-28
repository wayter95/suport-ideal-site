import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHead } from "@/components/ui/section-head";
import {
  companyInfo,
  reviews as fallbackReviews,
} from "@/configs/app.config";
import { fetchPlaceDetails, getInitials } from "@/libs/google-places";

interface NormalizedReview {
  initials: string;
  author: string;
  source: string;
  text: string;
  rating: number;
  photo?: string;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <p className="text-sm tracking-[2px]" aria-label={`${full} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-[#FFC107]" : "text-fg-3"}>
          ★
        </span>
      ))}
    </p>
  );
}

export async function Reviews() {
  const place = await fetchPlaceDetails({
    searchQuery: `${companyInfo.name} Assistência Técnica ${companyInfo.city} ${companyInfo.region}`,
  });

  const items: NormalizedReview[] = place?.reviews?.length
    ? place.reviews.slice(0, 3).map((r) => ({
        initials: getInitials(r.authorName),
        author: r.authorName,
        source: `Google · ${r.relativeTime}`,
        text: r.text,
        rating: r.rating,
        photo: r.authorPhotoUri,
      }))
    : fallbackReviews.map((r) => ({ ...r, rating: 5 }));

  const isLive = Boolean(place?.reviews?.length);

  return (
    <Section flushTop>
      <SectionHead
        eyebrow={
          place?.rating
            ? `Avaliações Google · ${place.rating.toFixed(1)} ★ (${place.userRatingCount ?? 0})`
            : "Avaliações Google"
        }
        title={
          <>
            Quem confiou
            <br />
            já voltou.
          </>
        }
        lead="Nossos clientes chegam por indicação e por busca no Google. Esse é o tipo de propaganda que a gente não compra — é construída todo dia, em cada serviço."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {items.map((review, idx) => (
          <Reveal
            key={`${review.author}-${idx}`}
            delay={((idx % 3) + 1) as 1 | 2 | 3}
            as="article"
            className="flex min-h-[240px] flex-col gap-4 rounded-lg border border-line bg-bg-elev p-5 sm:min-h-[280px] sm:p-7"
          >
            <Stars rating={review.rating} />
            <p className="flex-1 text-[15px] leading-[1.55] text-fg">{review.text}</p>
            <div className="flex items-center gap-3 border-t border-line pt-4">
              {review.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={review.photo}
                  alt={review.author}
                  width={36}
                  height={36}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="size-9 rounded-full border border-line object-cover"
                />
              ) : (
                <span className="grid size-9 place-items-center rounded-full border border-line bg-bg-elev-2 font-display text-sm font-semibold text-accent">
                  {review.initials}
                </span>
              )}
              <span className="flex flex-col">
                <span className="text-sm font-semibold">{review.author}</span>
                <span className="font-mono text-[12px] tracking-wider text-fg-3">
                  {review.source}
                </span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 max-w-full break-words font-mono text-[11px] uppercase leading-relaxed tracking-wider text-fg-3 sm:text-[12px]">
        {isLive
          ? "→ Avaliações sincronizadas em tempo real via Google Maps · atualizadas a cada hora"
          : "→ Avaliações ilustrativas. Configure GOOGLE_PLACE_ID no .env para sincronizar reviews reais."}
      </p>
    </Section>
  );
}
