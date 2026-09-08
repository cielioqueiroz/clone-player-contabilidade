"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/content/catalog";

export function OfficeStory() {
  const [showTeam, setShowTeam] = useState(false);
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const updateStory = () => {
      frame = 0;
      if (media.matches || !storyRef.current) return;
      const bounds = storyRef.current.getBoundingClientRect();
      const midway = window.innerHeight * 0.42;
      setShowTeam(bounds.top < midway && bounds.bottom > midway);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateStory);
    };

    updateStory();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    media.addEventListener("change", updateStory);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", updateStory);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="section container office-section" ref={storyRef}>
      <div className="office-story">
        <div className="office-copy">
          <p className="eyebrow">PESSOAS & ESTRUTURA</p>
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
          <ol className="office-steps">
            <li>
              <strong>Preparar o contexto</strong>
              <p>Antes da decisão, há espaço para organizar o que importa.</p>
            </li>
            <li>
              <strong>Transformar conversa em direção</strong>
              <p>Dados ganham sentido quando encontram pessoas e perguntas.</p>
            </li>
          </ol>
          <div className="office-address">
            <p className="eyebrow">PALMAS, TO</p>
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
          <div className="office-photo" data-stage={showTeam ? "team" : "space"}>
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
              O espaço
            </button>
            <button
              type="button"
              aria-pressed={showTeam}
              onClick={() => setShowTeam(true)}
            >
              As pessoas
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
