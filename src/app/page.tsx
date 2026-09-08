import Link from "next/link";
import { ServiceGrid } from "@/components/sections/service-grid";
import { specialties } from "@/content/catalog";
import { OfficeStory } from "@/components/sections/office-story";
import { HeroArt } from "@/components/features/hero-art";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> CONTABILIDADE COM PERSPECTIVA
          </p>
          <h1>
            Seu próximo
            <br />
            movimento.
            <br />
            <em>Mais claro.</em>
          </h1>
          <p className="hero-description">
            Transformar números em direção. Um novo olhar para a gestão, a
            contabilidade e as possibilidades do seu negócio.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/solucoes">
              Conheça as soluções <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/simulador">
              Explore seu cenário ↗
            </Link>
          </div>
        </div>
        <HeroArt />
      </section>
      <div className="container discipline-strip">
        <span>Visão estratégica</span>
        <span>Precisão contábil</span>
        <span>Tecnologia com propósito</span>
        <span>Relações de confiança</span>
      </div>
      <section className="section container reveal" id="solucoes">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SOLUÇÕES</p>
            <h2>
              Complexidade lá fora.
              <br />
              <em>Clareza por aqui.</em>
            </h2>
          </div>
          <p>
            Da rotina financeira às decisões tributárias, explore cinco frentes
            que se conectam ao seu negócio.
          </p>
        </div>
        <ServiceGrid />
      </section>
      <section className="specialties-section reveal">
        <div className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ESPECIALIDADES</p>
              <h2>
                Cada negócio tem
                <br />
                seu próprio contexto.
              </h2>
            </div>
            <p>
              Conhecer o setor muda as perguntas. E perguntas melhores abrem
              espaço para decisões mais conscientes.
            </p>
          </div>
          <div className="specialty-grid">
            {specialties.map((item) => (
              <Link
                className="specialty-card"
                key={item.slug}
                href={`/especialidades/${item.slug}`}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="text-link">Explorar segmento ↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <OfficeStory />
      <section className="section container closing-section reveal">
        <p className="eyebrow">PRÓXIMO PASSO</p>
        <h2>
          Boas decisões começam
          <br />
          com <em>outra perspectiva.</em>
        </h2>
        <Link className="button" href="/simulador">
          Encontre um ponto de partida ↗
        </Link>
        <p className="small-note">
          Percurso demonstrativo. Sem cadastro ou envio de dados.
        </p>
      </section>
    </>
  );
}
