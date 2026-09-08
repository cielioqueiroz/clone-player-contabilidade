import Link from "next/link";
import { services, specialties } from "@/content/catalog";
import { OfficeStory } from "@/components/sections/office-story";
import { HeroArt } from "@/components/features/hero-art";
import { HomeMotion } from "@/components/features/home-motion";

export default function Home() {
  return (
    <HomeMotion>
      <section
        className="hero-sequence"
        aria-label="Contabilidade com outra perspectiva"
      >
        <div className="hero-stage">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-composition">
            <div className="hero-copy">
              <p className="hero-kicker">
                Contabilidade. Com outra perspectiva.
              </p>
              <h1>
                <span className="hero-line">Seu negócio.</span>
                <span className="hero-line">Em outra</span>
                <span className="hero-line hero-line-accent">dimensão.</span>
              </h1>
              <div className="hero-caption">
                <p>
                  Mais visão para as suas decisões.
                  <br />
                  Mais espaço para o próximo passo.
                </p>
                <Link className="round-link" href="#solucoes">
                  <span>Conheça as soluções</span>
                </Link>
              </div>
            </div>
            <HeroArt />
            <div className="hero-foot">
              <span>Clareza que move negócios.</span>
              <a href="#manifesto">Uma nova perspectiva </a>
            </div>
          </div>
        </div>
      </section>
      <section className="perspective-section" id="manifesto">
        <div className="container perspective-inner">
          <p className="section-intro">
            Quando a visão muda,
            <br />o próximo passo aparece.
          </p>
          <h2 className="perspective-title">
            <span>Menos ruído.</span>
            <span className="perspective-second">
              Mais{" "}
              <span className="clarity-word">
                clareza.
                <svg
                  viewBox="0 0 600 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M4 22 Q290 0 596 15" />
                </svg>
              </span>
            </span>
          </h2>
          <div className="perspective-bottom">
            <p>
              Contabilidade faz mais sentido quando ajuda a enxergar. Organizar
              o presente. Entender o contexto. Abrir caminho para decisões
              melhores.
            </p>
            <Link className="text-link" href="/sobre-nos">
              Conheça o conceito{" "}
            </Link>
          </div>
        </div>
      </section>
      <section className="solutions-editorial container section" id="solucoes">
        <div className="editorial-heading">
          <p>Soluções que se conectam.</p>
          <h2>
            Da rotina.
            <br />À estratégia.
          </h2>
        </div>
        <div className="service-ledger">
          {services.map((service) => (
            <Link
              className="service-row"
              href={`/solucoes/${service.slug}`}
              key={service.slug}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Link>
          ))}
        </div>
        <Link className="text-link all-solutions" href="/solucoes">
          Ver todas as soluções{" "}
        </Link>
      </section>
      <section className="sectors-section">
        <div className="sector-ribbon" aria-hidden="true">
          <span>O contexto muda tudo. O contexto muda tudo.</span>
        </div>
        <div className="container section">
          <div className="editorial-heading">
            <p>Um olhar para cada setor.</p>
            <h2>
              O detalhe
              <br />
              faz a diferença.
            </h2>
          </div>
          <div className="sector-cards">
            {specialties.map((item, index) => (
              <Link
                className={`sector-card sector-${index === 0 ? "pharma" : "build"}`}
                key={item.slug}
                href={`/especialidades/${item.slug}`}
              >
                <div className="sector-art" aria-hidden="true">
                  {index === 0 ? (
                    <div className="pharma-cross">
                      <i />
                      <i />
                    </div>
                  ) : (
                    <div className="build-blocks">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  )}
                </div>
                <div className="sector-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="sector-link">Explorar segmento </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <OfficeStory />
      <section className="next-chapter">
        <div className="container next-chapter-inner">
          <p>O próximo movimento começa com uma boa pergunta.</p>
          <h2>
            Vamos
            <br />
            <span>em frente.</span>
          </h2>
          <Link className="next-cta" href="/simulador">
            <span>Explore seu cenário</span>
          </Link>
          <p className="next-note">
            Uma experiência demonstrativa. Sem cadastro ou envio de dados.
          </p>
        </div>
      </section>
    </HomeMotion>
  );
}
