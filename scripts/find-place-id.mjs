#!/usr/bin/env node
/**
 * Descobre o Place ID (formato ChIJ...) do estabelecimento via Places API (New).
 *
 * Uso:
 *   node scripts/find-place-id.mjs
 *
 * Lê a API key do .env.local automaticamente.
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");

let env = {};
try {
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  console.error("✖ Não achei .env.local em", envPath);
  process.exit(1);
}

const apiKey =
  env.GOOGLE_PLACES_API_KEY || env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

if (!apiKey) {
  console.error("✖ Defina GOOGLE_PLACES_API_KEY no .env.local");
  process.exit(1);
}

const query = "Suport Ideal Assistência Técnica Tapira MG";

const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask":
      "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
  },
  body: JSON.stringify({
    textQuery: query,
    languageCode: "pt-BR",
    regionCode: "BR",
  }),
});

if (!res.ok) {
  console.error(`✖ HTTP ${res.status}:`, await res.text());
  process.exit(1);
}

const data = await res.json();
const place = data.places?.[0];

if (!place) {
  console.error("✖ Nenhum lugar encontrado para:", query);
  process.exit(1);
}

console.log("");
console.log("✓ Encontrado:", place.displayName?.text);
console.log("  Endereço:  ", place.formattedAddress);
console.log("  Rating:    ", place.rating, `(${place.userRatingCount} reviews)`);
console.log("");
console.log("  PLACE ID → ", place.id);
console.log("");
console.log("Cole no .env.local:");
console.log(`  GOOGLE_PLACE_ID=${place.id}`);
console.log("");
