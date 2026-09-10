import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Called inside a GSAP matchMedia context; the caller owns cleanup and pause.
export function createSectionScenes(root: HTMLElement, mobile: boolean) {
  const select = gsap.utils.selector(root);
  select("[data-scroll-heading]").forEach((heading: HTMLElement) => {
    gsap.from(heading, {
      y: mobile ? 25 : 55,
      ease: "none",
      scrollTrigger: {
        trigger: heading,
        start: "top bottom",
        end: "top 55%",
        scrub: 0.6,
      },
    });
  });
  select("[data-scroll-card]").forEach((card: HTMLElement, index: number) => {
    gsap.from(card, {
      y: mobile ? 35 : 65,
      rotation: mobile ? 0 : index % 2 === 0 ? -1.5 : 1.5,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 95%",
        toggleActions: "play none none reverse",
      },
    });
  });
  select("[data-scroll-object]").forEach(
    (object: HTMLElement, index: number) => {
      gsap.fromTo(
        object,
        { y: 35, rotation: index % 2 === 0 ? -12 : 12 },
        {
          y: -30,
          rotation: index % 2 === 0 ? 12 : -12,
          ease: "none",
          scrollTrigger: {
            trigger: object.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
    },
  );
  select("[data-scroll-phone]").forEach((phone: HTMLElement) => {
    gsap.fromTo(
      phone,
      { rotation: 12, y: 70 },
      {
        rotation: -6,
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: phone.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      },
    );
  });
  select("[data-gallery-image]").forEach(
    (photo: HTMLElement, index: number) => {
      gsap.fromTo(
        photo,
        { yPercent: index % 2 === 0 ? -5 : 5, scale: 1.12 },
        {
          yPercent: index % 2 === 0 ? 5 : -5,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: photo.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    },
  );
}
