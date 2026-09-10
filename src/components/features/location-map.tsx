"use client";

import { useState } from "react";
import { site } from "@/content/catalog";

export function LocationMap() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="location-map">
      {isLoaded ? (
        <iframe
          src={site.mapsEmbed}
          title="Localização da sede da Player Contabilidade em Palmas"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="location-map-placeholder">
          <span className="map-grid" aria-hidden="true" />
          <span className="map-pin" aria-hidden="true" />
          <div>
            <p>O mapa usa um serviço externo do Google.</p>
            <button type="button" onClick={() => setIsLoaded(true)}>
              Carregar mapa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
