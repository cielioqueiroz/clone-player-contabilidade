"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

const journeyFrames = [
  {
    src: "/images/official/player-maps-panorama.jpg",
    alt: "Vista externa ampla da sede da Player Contabilidade em Palmas.",
    eyebrow: "O contexto",
    title: "Toda operação começa com um ponto de vista.",
    text: "Da fachada da sede em Palmas, a apresentação aproxima o olhar da estrutura e das pessoas.",
  },
  {
    src: "/images/official/player-maps-view.jpg",
    alt: "Fachada da sede da Player Contabilidade, com o letreiro e a bandeira do Brasil.",
    eyebrow: "A aproximação",
    title: "A informação ganha direção quando encontra uma conversa.",
    text: "A cena abandona a escala da fachada e começa a revelar o ambiente por dentro.",
  },
  {
    src: "/images/official/player-maps-interior-02.jpg",
    alt: "Área interna da sede da Player com estações de trabalho e equipe em atividade.",
    eyebrow: "Por dentro",
    title: "É no cotidiano que o contexto vira próximo passo.",
    text: "Uma vista interna publicada no Google Maps mostra a operação em movimento.",
  },
  {
    src: "/images/official/player-maps-interior-05.jpg",
    alt: "Sala de reunião da sede da Player com mesa de mármore e cadeiras de couro.",
    eyebrow: "A mesa",
    title: "É na mesa que a conversa encontra direção.",
    text: "Materiais, tecnologia e espaço preparados para decisões mais claras.",
  },
  {
    src: "/images/player-team-meeting.jpg",
    alt: "Registro da equipe em reunião na sede da Player Contabilidade.",
    eyebrow: "A presença",
    title: "Clareza também é saber com quem contar.",
    text: "A sequência termina com a equipe reunida — pessoas, perguntas e direção.",
  },
] as const;

export function OfficeJourney() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    if (
      !window.matchMedia("(min-width: 801px)").matches ||
      !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    )
      return;

    let cancelled = false;
    let revert = () => {};

    void import("./scroll-scenes").then(({ gsap }) => {
      if (cancelled) return;
      const media = gsap.matchMedia();
      revert = () => media.revert();
      media.add(
        {
          desktop: "(min-width: 801px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.desktop || !context.conditions.motion)
            return;

          const scope = root.current;
          if (!scope) return;

          const frameElements = Array.from(
            scope.querySelectorAll<HTMLElement>(".journey-frame"),
          );
          const copyElements = Array.from(
            scope.querySelectorAll<HTMLElement>(".journey-copy"),
          );
          const stage = scope.querySelector<HTMLElement>(
            ".office-journey-stage",
          );
          if (!stage || frameElements.length !== copyElements.length) return;

          const animationContext = gsap.context(() => {
            gsap.set(frameElements.slice(1), { autoAlpha: 0 });
            gsap.set(copyElements.slice(1), { autoAlpha: 0, yPercent: 12 });

            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: scope,
                start: "top top",
                end: "+=2600",
                scrub: 0.8,
                pin: stage,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            timeline.to(frameElements[0], { scale: 1.14, yPercent: -4 }, 0);
            frameElements.slice(1).forEach((frame, index) => {
              const previousFrame = frameElements[index];
              const previousCopy = copyElements[index];
              const copy = copyElements[index + 1];
              const start = 0.17 + index * 0.2;
              timeline
                .to(previousFrame, { autoAlpha: 0, scale: 1.18 }, start)
                .to(previousCopy, { autoAlpha: 0, yPercent: -12 }, start)
                .to(frame, { autoAlpha: 1, scale: 1.05 }, start + 0.03)
                .to(copy, { autoAlpha: 1, yPercent: 0 }, start + 0.07)
                .to(frame, { scale: 1.13, yPercent: -3 }, start + 0.1);
            });
            timeline.to(stage, { borderRadius: "0px", scale: 1 }, 0.98);
          }, scope);

          return () => animationContext.revert();
        },
        root,
      );
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <section
      className="office-journey"
      ref={root}
      aria-labelledby="journey-title"
    >
      <div className="office-journey-stage">
        <div className="journey-frame-stack" aria-hidden="true">
          {journeyFrames.map((frame) => (
            <div className="journey-frame" key={frame.src}>
              <Image
                src={frame.src}
                alt=""
                fill
                sizes="100vw"
                loading="lazy"
                quality={72}
              />
            </div>
          ))}
        </div>
        <div className="journey-shade" aria-hidden="true" />
        <div className="container office-journey-content">
          <p className="journey-label" id="journey-title">
            Uma descida pela estrutura da Player
          </p>
          <div className="journey-copy-stack">
            {journeyFrames.map((frame) => (
              <div className="journey-copy" key={frame.eyebrow}>
                <p className="eyebrow">{frame.eyebrow}</p>
                <h2>{frame.title}</h2>
                <p>{frame.text}</p>
              </div>
            ))}
          </div>
          <div className="journey-footer">
            <span>Role para atravessar a cena</span>
            <span>01 — 05</span>
          </div>
        </div>
      </div>
      <div className="journey-mobile-content container">
        <p className="eyebrow">Uma descida pela estrutura da Player</p>
        <h2>Do contexto à presença.</h2>
        <p>
          Registros públicos da estrutura e da equipe, apresentados em uma
          sequência estática para telas menores.
        </p>
        <div className="journey-mobile-grid">
          {journeyFrames
            .filter(
              (_, index) => index === 0 || index === journeyFrames.length - 1,
            )
            .map((frame) => (
              <figure key={frame.src}>
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 800px) calc(50vw - 30px), 1px"
                  quality={68}
                  loading="lazy"
                />
                <figcaption>{frame.eyebrow}</figcaption>
              </figure>
            ))}
        </div>
      </div>
      <p className="journey-credit container">
        Imagens institucionais: Player Contabilidade ·{" "}
        <a
          href="https://www.instagram.com/playercontabilidade/p/DcMkgyREfDB/"
          target="_blank"
          rel="noopener noreferrer"
        >
          publicação original
        </a>
      </p>
    </section>
  );
}
