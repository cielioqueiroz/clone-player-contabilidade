import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/ui/page-intro";
import { site } from "@/content/catalog";
import { company, principles, credentials } from "@/content/company";
import { Testimonials, NextStep } from "@/components/sections/company-sections";

export const metadata: Metadata = { title: "Sobre a Player" };
const galleryCaptions = [
  "Equipe reunida na sala de reuniões",
  "Encontro de formação da equipe",
  "Apresentação na sala de reuniões",
  "Equipe no ambiente de trabalho",
  "Estação de trabalho e organização da rotina",
  "Conversa da equipe em torno da mesa",
];

export default function About() {
  return (
    <>
      <section className="container section about-opening">
        <PageIntro
          label="Sobre a Player"
          title="Ciência nos números. Pessoas no centro."
          description={company.description}
        />
        <div className="company-story" data-scroll-heading>
          <h2>
            Especialização.
            <br />
            <em>De dentro para fora.</em>
          </h2>
          <div>
            <p>
              A atuação divulgada pela empresa combina planejamento contábil,
              societário e tributário com rotinas de departamento pessoal. O
              setor farmacêutico é o centro dessa proposta, junto à atenção ao
              varejo de materiais de construção.
            </p>
            <p>
              Fundada em 2022, segundo sua apresentação pública, a Player
              conecta tecnologia e profissionais especializados para acompanhar
              empresas em diferentes regiões do país.
            </p>
            <a
              className="text-link"
              href={site.original}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar a apresentação oficial da empresa
            </a>
          </div>
        </div>
      </section>
      <section className="principles-section section">
        <div className="container">
          <div className="chapter-heading" data-scroll-heading>
            <p>Direção e propósito</p>
            <h2>
              O que orienta
              <br />
              <em>cada movimento.</em>
            </h2>
          </div>
          <div className="principles-grid">
            {principles.map((item) => (
              <article key={item.title} data-scroll-card>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="company-reach section">
        <div className="container">
          <div className="chapter-heading" data-scroll-heading>
            <p>Retrato divulgado no site original</p>
            <h2>
              Uma presença
              <br />
              <em>que se expande.</em>
            </h2>
          </div>
          <div className="reach-grid">
            {[
              ["+1.000", "Empresários atendidos"],
              ["24", "Estados brasileiros"],
              ["100", "Especialistas"],
            ].map(([value, label]) => (
              <div key={label} data-scroll-card>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <details className="source-disclosure">
            <summary>Sobre os números publicados</summary>
            <p>
              Estes valores são declarações do site institucional consultado em
              08/09/2026, sem auditoria deste projeto. A página também anuncia
              100% de satisfação e mais de R$ 7 milhões economizados. O
              Instagram apresenta outros totais; atualidade, critérios e
              resultados devem ser confirmados diretamente com a empresa. Eles
              não representam uma promessa deste demonstrativo.
            </p>
            <a
              className="text-link"
              href={site.original}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar a fonte
            </a>
          </details>
        </div>
      </section>
      <section className="structure-section section" id="estrutura">
        <div className="container">
          <div className="chapter-heading" data-scroll-heading>
            <p>Galeria institucional da Player</p>
            <h2>
              Um olhar
              <br />
              <em>para dentro.</em>
            </h2>
            <p>
              As seis fotografias apresentadas na página original. Este é um
              registro institucional; a sede atual confirmada fica na Av.
              Siqueira Campos, em Palmas.
            </p>
          </div>
          <div className="structure-gallery">
            {galleryCaptions.map((caption, index) => (
              <figure key={caption}>
                <div className="gallery-frame">
                  <Image
                    data-gallery-image
                    src={`/images/official/estrutura-${index + 1}.jpg`}
                    alt={caption}
                    width={3024}
                    height={4032}
                    sizes="(max-width: 700px) 90vw, 44vw"
                  />
                </div>
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
          <a
            className="text-link"
            href={site.original}
            target="_blank"
            rel="noopener noreferrer"
          >
            Fotografias: Player Contabilidade
          </a>
        </div>
      </section>
      <section className="credentials-section section" id="certificacoes">
        <div className="container">
          <div className="chapter-heading" data-scroll-heading>
            <p>Compromissos apresentados pela empresa</p>
            <h2>
              Confiança também
              <br />
              <em>se constrói na prática.</em>
            </h2>
            <p>
              Os nove selos abaixo constam da apresentação institucional da
              Player. A reprodução identifica o material da fonte; não certifica
              este site nem verifica a validade dos reconhecimentos.
            </p>
          </div>
          <div className="credentials-grid">
            {credentials.map((item, index) => (
              <article key={item.title} data-scroll-card>
                <Image
                  src={`/images/official/selo-${index + 1}.png`}
                  width={75}
                  height={75}
                  alt=""
                />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <NextStep />
    </>
  );
}
