"use client";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createSectionScenes } from "./scroll-scenes";
gsap.registerPlugin(ScrollTrigger);

export function PageMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const isHome = pathname === "/";
  useLayoutEffect(() => {
    // Reset before painting the new route. Hash links retain their native target.
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);
  useEffect(() => {
    if (!root.current || isHome || paused) return;
    const element = root.current;
    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 800px)",
      },
      (context) => {
        if (!context.conditions?.motion) return;
        const select = gsap.utils.selector(element);
        gsap.from(select(".page-intro h1"), {
          y: 45,
          duration: 1,
          ease: "power3.out",
          clearProps: "transform",
        });
        select(".intro-orbit").forEach((art: HTMLElement) =>
          gsap.to(art, {
            rotation: 100,
            scale: 1.25,
            y: -75,
            ease: "none",
            scrollTrigger: {
              trigger: art.parentElement,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          }),
        );
        select(".service-card, .specialty-card, .detail-panel").forEach(
          (card: HTMLElement) =>
            gsap.from(card, {
              y: 45,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
            }),
        );
        createSectionScenes(element, Boolean(context.conditions.mobile));
        element.dataset.motion = "ready";
        let active = true;
        void document.fonts.ready.then(() => {
          if (active) ScrollTrigger.refresh();
        });
        return () => {
          active = false;
          delete element.dataset.motion;
        };
      },
      element,
    );
    return () => media.revert();
  }, [pathname, paused, isHome]);
  return (
    <div
      ref={root}
      className={`route-motion${isHome ? " route-home" : ""}`}
      data-paused={paused}
    >
      {children}
      {!isHome && (
        <>
          <noscript>
            <style>{`.motion-toggle{display:none!important}`}</style>
          </noscript>
          <button
            className="motion-toggle"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Ativar movimento" : "Pausar movimento"}
          </button>
        </>
      )}
    </div>
  );
}
