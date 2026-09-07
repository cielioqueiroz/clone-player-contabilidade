"use client";
import { useState } from "react";
import Image from "next/image";
import { site } from "@/content/catalog";

export function OfficeStory() {
  const [showTeam, setShowTeam] = useState(false);
  return (
    <section className="section container office-section">
      <div className="office-story">
        <div>
          <p className="eyebrow">03 / PESSOAS & ESTRUTURA</p>
          <h2>
            O espaço é só
            <br />o <em>começo.</em>
          </h2>
          <p>
            Uma sala reúne mesas, ideias e pessoas. O que transforma esse espaço
            é o que acontece entre elas.
          </p>
          <p>
            Explore dois momentos da mesma sala, publicados pela Player: o
            ambiente e a equipe em reunião.
          </p>
          <div className="office-address">
            <p className="eyebrow">SEDE ATUAL / PALMAS, TO</p>
            <p>{site.address}</p>
            <a
              className="text-link"
              href={site.maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver a sede no Google Maps ↗
            </a>
          </div>
        </div>
        <div className="office-visual">
          <div className="office-photo">
            <Image
              src="/images/player-meeting-room.jpg"
              alt="Sala de reunião da Player com mesa de pedra, cadeiras e tela, antes da reunião."
              fill
              sizes="(max-width: 700px) 90vw, 480px"
              data-visible={!showTeam}
              aria-hidden={showTeam}
            />
            <Image
              src="/images/player-team-meeting.jpg"
              alt="Equipe da Player reunida à mesa, com notebooks, na mesma sala."
              fill
              sizes="(max-width: 700px) 90vw, 480px"
              data-visible={showTeam}
              aria-hidden={!showTeam}
            />
          </div>
          <div
            className="office-choices"
            role="group"
            aria-label="Momentos da sala de reunião"
          >
            <button
              type="button"
              aria-pressed={!showTeam}
              onClick={() => setShowTeam(false)}
            >
              01 / O espaço
            </button>
            <button
              type="button"
              aria-pressed={showTeam}
              onClick={() => setShowTeam(true)}
            >
              02 / As pessoas
            </button>
          </div>
          <a
            className="photo-credit"
            href="https://www.instagram.com/playercontabilidade/p/DcMkgyREfDB/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fotos: Player Contabilidade · Publicação original ↗
          </a>
        </div>
      </div>
    </section>
  );
}
