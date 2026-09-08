"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { getRecommendation, priorities } from "@/lib/diagnosis";

export function ScenarioExplorer() {
  const [choice, setChoice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const result = submitted ? getRecommendation(choice) : null;
  const resultRef = useRef<HTMLDivElement>(null);
  return (
    <div className="scenario-layout">
      <form
        className="scenario-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (getRecommendation(choice)) {
            setSubmitted(true);
            requestAnimationFrame(() => resultRef.current?.focus());
          }
        }}
      >
        <fieldset>
          <legend>Qual é a sua prioridade hoje?</legend>
          <p>Escolha um tema para explorar as soluções relacionadas.</p>
          {priorities.map((priority) => (
            <label className="choice" key={priority}>
              <input
                type="radio"
                name="priority"
                value={priority}
                required
                checked={choice === priority}
                onChange={(event) => {
                  setChoice(event.target.value);
                  setSubmitted(false);
                }}
              />
              <span>{priority}</span>
            </label>
          ))}
        </fieldset>
        <button className="button" type="submit">
          Ver próximo passo
        </button>
      </form>
      <div
        className="scenario-result"
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
        aria-atomic="true"
      >
        {result ? (
          <>
            <p className="eyebrow">Uma direção para explorar</p>
            <h2>{result.title}</h2>
            <p>{result.text}</p>
            <Link className="text-link" href={result.href}>
              Conhecer a solução
            </Link>
            <button
              className="reset-button"
              type="button"
              onClick={() => {
                setChoice("");
                setSubmitted(false);
                document
                  .querySelector<HTMLInputElement>('input[name="priority"]')
                  ?.focus();
              }}
            >
              Recomeçar
            </button>
          </>
        ) : (
          <>
            <h2>O próximo movimento começa com uma boa pergunta.</h2>
            <p>
              Este percurso é ilustrativo. Não calcula impostos, não emite
              diagnóstico e não envia suas escolhas.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
