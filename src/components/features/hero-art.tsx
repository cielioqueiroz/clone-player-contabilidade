"use client";

import { type PointerEvent, useRef } from "react";

export function HeroArt() {
  const artRef = useRef<HTMLDivElement>(null);

  function resetParallax() {
    artRef.current?.style.setProperty("--art-x", "0px");
    artRef.current?.style.setProperty("--art-y", "0px");
  }

  function moveParallax(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !artRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    artRef.current.style.setProperty("--art-x", `${(x * 18).toFixed(2)}px`);
    artRef.current.style.setProperty("--art-y", `${(y * 18).toFixed(2)}px`);
  }

  return (
    <div
      className="hero-art"
      aria-hidden="true"
      onPointerMove={moveParallax}
      onPointerLeave={resetParallax}
      ref={artRef}
    >
      <div className="art-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="sculpture">
        <span className="sculpture-face face-one" />
        <span className="sculpture-face face-two" />
        <span className="sculpture-face face-three" />
      </div>
      <span className="art-coordinate top-coordinate">PERSPECTIVA</span>
      <span className="art-coordinate bottom-coordinate">
        DADOS → CLAREZA → DIREÇÃO
      </span>
      <div className="art-note">
        <span>O futuro pede</span>
        <strong>um novo ângulo.</strong>
      </div>
    </div>
  );
}
