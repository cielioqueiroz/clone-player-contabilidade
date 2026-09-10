"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createSectionScenes } from "./scroll-scenes";

gsap.registerPlugin(ScrollTrigger);

export function HomeMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!scope.current || paused) return;
    const root = scope.current;
    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 801px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions?.desktop || !context.conditions.motion) return;
        const desktop = true;
        const select = gsap.utils.selector(root);
        createSectionScenes(root, !desktop);
        const hero = select(".hero-sequence")[0];
        gsap.from(select(".hero-line"), {
          y: 65,
          rotation: 2,
          duration: 1.25,
          stagger: 0.11,
          ease: "power3.out",
          clearProps: "transform",
        });
        gsap.from(select(".portal-tilt"), {
          scale: 0.75,
          rotation: -22,
          duration: 1.7,
          ease: "power3.out",
        });
        const story = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
          },
          defaults: { ease: "none" },
        });
        story
          .to(
            select(".portal-sculpture"),
            {
              rotation: 100,
              scale: desktop ? 1.85 : 1.35,
              xPercent: desktop ? -12 : 8,
              yPercent: -10,
            },
            0,
          )
          .to(select(".hero-copy"), { y: desktop ? -100 : -35 }, 0)
          .to(select(".portal-halo"), { scale: 1.6 }, 0);
        const fragmentTravel = desktop ? 1 : 0.5;
        const fragmentPositions = [
          { x: 65, y: -125, rotation: -16 },
          { x: 115, y: 10, rotation: 12 },
          { x: -50, y: 135, rotation: -9 },
        ];
        select(".brand-fragment").forEach(
          (fragment: HTMLElement, index: number) => {
            const position = fragmentPositions[index];
            story.to(
              fragment,
              {
                x: position.x * fragmentTravel,
                y: position.y * fragmentTravel,
                rotation: position.rotation,
                scale: 1.06,
              },
              0,
            );
          },
        );
        gsap.fromTo(
          select(".perspective-title > span:first-child"),
          { xPercent: -9 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: select(".perspective-section"),
              start: "top bottom",
              end: "center center",
              scrub: 0.6,
            },
          },
        );
        gsap.fromTo(
          select(".perspective-second"),
          { xPercent: 10 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: select(".perspective-section"),
              start: "top bottom",
              end: "center center",
              scrub: 0.6,
            },
          },
        );
        gsap.from(select(".clarity-word path"), {
          strokeDashoffset: 610,
          ease: "none",
          scrollTrigger: {
            trigger: select(".perspective-title"),
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.3,
          },
        });
        select(".service-row").forEach((row: HTMLElement) => {
          gsap.from(row, {
            y: 40,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 93%",
              toggleActions: "play none none reverse",
            },
          });
        });
        gsap.fromTo(
          select(".sector-ribbon span"),
          { xPercent: 0 },
          {
            xPercent: -22,
            ease: "none",
            scrollTrigger: {
              trigger: select(".sectors-section"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
        select(".sector-art").forEach((art: HTMLElement) => {
          gsap.fromTo(
            art.firstElementChild,
            { rotation: -14, y: 55 },
            {
              rotation: 12,
              y: -35,
              ease: "none",
              scrollTrigger: {
                trigger: art,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });
        gsap.fromTo(
          select(".office-visual"),
          { clipPath: "inset(8% 8% 8% 8% round 80px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            ease: "none",
            scrollTrigger: {
              trigger: select(".office-visual"),
              start: "top 90%",
              end: "center 60%",
              scrub: 0.45,
            },
          },
        );
        gsap.from(select(".next-chapter h2 span"), {
          xPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: select(".next-chapter"),
            start: "top bottom",
            end: "center center",
            scrub: 0.65,
          },
        });
        const art = root.querySelector<HTMLElement>(".hero-art");
        const tilt = root.querySelector<HTMLElement>(".portal-tilt");
        const move = (event: PointerEvent) => {
          if (!art || !tilt || event.pointerType !== "mouse") return;
          const bounds = art.getBoundingClientRect();
          gsap.to(tilt, {
            x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 55,
            y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 40,
            duration: 0.7,
            overwrite: "auto",
          });
        };
        const reset = () => {
          if (tilt)
            gsap.to(tilt, { x: 0, y: 0, duration: 0.7, overwrite: "auto" });
        };
        art?.addEventListener("pointermove", move);
        art?.addEventListener("pointerleave", reset);
        root.dataset.motion = "ready";
        let active = true;
        void document.fonts.ready.then(() => {
          if (active) ScrollTrigger.refresh();
        });
        return () => {
          active = false;
          art?.removeEventListener("pointermove", move);
          art?.removeEventListener("pointerleave", reset);
          if (tilt) {
            gsap.killTweensOf(tilt);
            gsap.set(tilt, { clearProps: "transform" });
          }
          delete root.dataset.motion;
        };
      },
      root,
    );
    return () => media.revert();
  }, [paused]);

  return (
    <div className="cinematic-home" ref={scope} data-paused={paused}>
      <noscript>
        <style>{`.hero-sequence{height:auto!important;min-height:0!important}.hero-stage{position:relative!important}.motion-toggle{display:none!important}`}</style>
      </noscript>
      {children}
      <button
        className="motion-toggle"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? "Ativar movimento" : "Pausar movimento"}
      </button>
    </div>
  );
}
