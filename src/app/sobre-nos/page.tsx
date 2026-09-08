import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { site } from "@/content/catalog";
export const metadata: Metadata = { title: "Sobre o conceito" };
export default function About() {
  return (
    <section className="container section">
      <PageIntro
        label="SOBRE O CONCEITO"
        title="Precisão nos números. Intenção no design."
        description="Um estudo independente de como clareza, tecnologia e uma experiência bem construída podem aproximar pessoas de temas complexos."
      />
      <div className="detail-grid">
        <div>
          <h2>Um projeto de Ciélio Queiroz.</h2>
          <p>
            Esta é uma releitura conceitual da presença digital da Player
            Contabilidade, desenvolvida como demonstração de engenharia de
            software e design de interfaces.
          </p>
          <p>
            O conteúdo apresenta temas de atuação encontrados nas fontes
            públicas da empresa. Não representa uma oferta comercial,
            diagnóstico ou vínculo oficial.
          </p>
        </div>
        <div className="detail-panel">
          <p className="eyebrow">REFERÊNCIA INSTITUCIONAL</p>
          <h2>Pessoas, estrutura e contexto.</h2>
          <p>
            A pesquisa visual considera a presença da empresa no Instagram e as
            imagens públicas da sede em Palmas. As fontes originais permitem
            conhecer a empresa e sua estrutura.
          </p>
          <a
            className="text-link"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram da empresa
          </a>
          <a
            className="text-link block-link"
            href={site.original}
            target="_blank"
            rel="noopener noreferrer"
          >
            Site oficial
          </a>
        </div>
      </div>
    </section>
  );
}
