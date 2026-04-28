"use client";

import { useCallback } from "react";

interface MapDeeplinkOptions {
  address: string;
  coords?: { lat: number; lng: number };
}

/**
 * Replica o comportamento do app.js original: ao clicar no map-card,
 * abre o app de mapas adequado ao SO (Apple Maps no iOS, geo: no Android,
 * Google Maps web no desktop). Quando há coords, abre direto no pin exato;
 * senão, busca pelo endereço.
 */
export function useMapDeeplink({ address, coords }: MapDeeplinkOptions) {
  return useCallback(() => {
    const ua = navigator.userAgent;
    const isIos = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const encodedAddr = encodeURIComponent(address);

    let url: string;
    if (coords) {
      const { lat, lng } = coords;
      const label = encodedAddr;
      if (isIos) url = `maps://?ll=${lat},${lng}&q=${label}`;
      else if (isAndroid) url = `geo:${lat},${lng}?q=${lat},${lng}(${label})`;
      else url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    } else {
      if (isIos) url = `maps://?q=${encodedAddr}`;
      else if (isAndroid) url = `geo:0,0?q=${encodedAddr}`;
      else url = `https://www.google.com/maps/search/?api=1&query=${encodedAddr}`;
    }

    window.open(url, "_blank");
  }, [address, coords]);
}
