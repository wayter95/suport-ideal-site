/**
 * Cliente para a Places API (New).
 *
 * Configuração mínima:
 *   GOOGLE_PLACES_API_KEY=...
 *
 * Opcional (pula a auto-descoberta):
 *   GOOGLE_PLACE_ID=ChIJ...   (Place ID — use o da ferramenta do Google ou o retornado por searchText)
 *
 * Não use o trecho "0x…:0x…" copiado do iframe/embed do Maps: isso é CID, não Place ID.
 *
 * Quando o Place ID não é fornecido, é descoberto via `places:searchText`
 * usando o `searchQuery` que o consumidor passa. Resultado fica em cache
 * de módulo durante o ciclo de vida do processo.
 */

const PLACES_HOST = "https://places.googleapis.com/v1/places";
const REVALIDATE_SECONDS = 60 * 60; // 1 hora

export interface PlaceReview {
  rating: number;
  text: string;
  authorName: string;
  authorPhotoUri?: string;
  relativeTime: string;
  publishTime: string;
}

export interface PlaceDetails {
  rating?: number;
  userRatingCount?: number;
  reviews: PlaceReview[];
}

interface GoogleReviewRaw {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
}

interface GooglePlaceResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReviewRaw[];
}

interface GoogleSearchTextResponse {
  places?: Array<{ id?: string; displayName?: { text?: string }; formattedAddress?: string }>;
}

function getApiKey(): string | undefined {
  return (
    process.env.GOOGLE_PLACES_API_KEY ??
    process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
  );
}

/** CID do URL do embed do Maps (ex.: !1s0x94b1…%3A0x374c…) — inválido na Places API (New). */
function isMapsEmbedCid(id: string): boolean {
  return /^0x[0-9a-f]+:0x[0-9a-f]+$/i.test(id.trim());
}

function normalizeConfiguredPlaceId(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let id = raw.trim();
  try {
    id = decodeURIComponent(id);
  } catch {
    /* mantém id */
  }
  if (id.startsWith("places/")) id = id.slice("places/".length);
  if (isMapsEmbedCid(id)) {
    console.warn(
      "[google-places] GOOGLE_PLACE_ID está no formato de CID do Maps (0x…:0x…), não é aceito pela API. Remova do .env ou use um Place ID (ex. ChIJ…). Tentando searchQuery.",
    );
    return undefined;
  }
  return id || undefined;
}

let cachedResolvedPlaceId: string | null | undefined;

async function resolvePlaceIdFromText(
  apiKey: string,
  query: string,
): Promise<string | null> {
  if (cachedResolvedPlaceId !== undefined) return cachedResolvedPlaceId;

  try {
    const res = await fetch(`${PLACES_HOST}:searchText`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
      },
      body: JSON.stringify({ textQuery: query, languageCode: "pt-BR", regionCode: "BR" }),
      next: { revalidate: 60 * 60 * 24 }, // 24h
    });

    if (!res.ok) {
      console.error(
        `[google-places] searchText falhou (${res.status}):`,
        await res.text(),
      );
      cachedResolvedPlaceId = null;
      return null;
    }

    const data = (await res.json()) as GoogleSearchTextResponse;
    const first = data.places?.[0];
    if (!first?.id) {
      console.warn(`[google-places] nenhum lugar encontrado para "${query}"`);
      cachedResolvedPlaceId = null;
      return null;
    }

    console.info(
      `[google-places] Place ID auto-resolvido para "${first.displayName?.text}":`,
      first.id,
    );
    cachedResolvedPlaceId = first.id;
    return first.id;
  } catch (err) {
    console.error("[google-places] erro inesperado em searchText:", err);
    cachedResolvedPlaceId = null;
    return null;
  }
}

export async function fetchPlaceDetails(opts?: {
  searchQuery?: string;
}): Promise<PlaceDetails | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn(
      "[google-places] GOOGLE_PLACES_API_KEY ausente — usando reviews estáticos",
    );
    return null;
  }

  let placeId = normalizeConfiguredPlaceId(process.env.GOOGLE_PLACE_ID);
  if (!placeId && opts?.searchQuery) {
    placeId =
      (await resolvePlaceIdFromText(apiKey, opts.searchQuery)) ?? undefined;
  }
  if (!placeId) {
    console.warn(
      "[google-places] sem Place ID (defina GOOGLE_PLACE_ID ou passe searchQuery)",
    );
    return null;
  }

  try {
    const res = await fetch(
      `${PLACES_HOST}/${placeId}?languageCode=pt-BR&regionCode=BR`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!res.ok) {
      console.error(
        `[google-places] details falhou (${res.status}):`,
        await res.text(),
      );
      return null;
    }

    const data = (await res.json()) as GooglePlaceResponse;
    return {
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      reviews: (data.reviews ?? []).map((r) => ({
        rating: r.rating ?? 5,
        text: r.text?.text ?? r.originalText?.text ?? "",
        authorName: r.authorAttribution?.displayName ?? "Anônimo",
        authorPhotoUri: r.authorAttribution?.photoUri,
        relativeTime: r.relativePublishTimeDescription ?? "",
        publishTime: r.publishTime ?? "",
      })),
    };
  } catch (err) {
    console.error("[google-places] erro inesperado em details:", err);
    return null;
  }
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}
