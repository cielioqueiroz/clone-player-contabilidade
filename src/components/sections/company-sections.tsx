import Image from "next/image";
import Link from "next/link";
import { advantages, benefits, company } from "@/content/company";
import { site } from "@/content/catalog";
import { PlayerLogo } from "@/components/ui/player-logo";

export function Advantages() {
  return (
    <section className="advantages-section section" id="vantagens">
      <div className="container">
        <div className="chapter-heading" data-scroll-heading>
          <p>Vantagens da Player</p>
          <h2>
            Especialização que
            <br />
            <em>faz parte da rotina.</em>
          </h2>
        </div>
        <div className="advantage-grid">
          {advantages.map((item) => (
            <article
              className="advantage-card"
              data-scroll-card
              key={item.title}
            >
              <div
                className={`advantage-art art-${item.shape}`}
                aria-hidden="true"
              >
                <div data-scroll-object>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <Link className="text-link" href="/contato">
          Conhecer os canais de atendimento
        </Link>
      </div>
    </section>
  );
}

export function OperationalBenefits() {
  return (
    <section className="operations-section section" id="beneficios">
      <div className="container operations-layout">
        <div className="operations-heading" data-scroll-heading>
          <p>Da informação à ação</p>
          <h2>
            Menos tarefas
            <br />
            soltas.
            <br />
            <em>Mais conexão.</em>
          </h2>
          <p>
            Tecnologia e acompanhamento humano nas frentes apresentadas pela
            Player.
          </p>
          <Link className="text-link" href="/contato">
            Conversar com a empresa
          </Link>
        </div>
        <div className="operations-list">
          {benefits.map((item) => (
            <article
              className="operation-scene"
              key={item.kind}
              data-scroll-card
            >
              <div
                className={`operation-visual visual-${item.kind}`}
                aria-hidden="true"
              >
                <div data-scroll-object>
                  {item.kind === "schedule" ? (
                    <>
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </>
                  ) : item.kind === "pricing" ? (
                    <>
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </>
                  ) : (
                    <>
                      <i />
                      <i />
                      <i />
                    </>
                  )}
                </div>
              </div>
              <p className="operation-label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AppShowcase() {
  return (
    <section className="app-showcase section" id="aplicativo">
      <div className="container app-layout">
        <div className="app-copy" data-scroll-heading>
          <p>O escritório também vai com você</p>
          <h2>
            Seu negócio.
            <br />
            <em>Mais perto.</em>
          </h2>
          <p>
            Acesse o aplicativo da Player para acompanhar documentos, avisos e
            informações da rotina contábil. As lojas e o portal abaixo são os
            destinos publicados pela empresa.
          </p>
          <div className="app-links">
            <a
              className="button"
              href={company.appStore}
              target="_blank"
              rel="noopener noreferrer"
            >
              App Store
            </a>
            <a
              className="button button-secondary"
              href={company.android}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play
            </a>
          </div>
          <a
            className="text-link block-link"
            href={company.portal}
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar o escritório virtual da empresa
          </a>
        </div>
        <div className="app-stage">
          <div className="app-orbit" aria-hidden="true" />
          <div className="app-phone" data-scroll-phone>
            <div className="phone-camera" aria-hidden="true" />
            <PlayerLogo />
            <p className="phone-greeting">Tudo em perspectiva.</p>
            <div className="phone-summary">
              <span>Seu escritório</span>
              <strong>Conectado.</strong>
              <div className="phone-chart" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="phone-item">
              <span>Documentos</span>
              <span>Organização</span>
            </div>
            <div className="phone-item">
              <span>Agenda</span>
              <span>Acompanhamento</span>
            </div>
            <div className="phone-item">
              <span>Atendimento</span>
              <span>Proximidade</span>
            </div>
            <p className="phone-caption">
              Visual ilustrativo do conceito.
              <br />A interface real está nas lojas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="testimonials-section section" id="depoimentos">
      <div className="container">
        <div className="chapter-heading" data-scroll-heading>
          <p>Depoimentos publicados pela Player</p>
          <h2>
            Histórias de quem
            <br />
            <em>está do outro lado.</em>
          </h2>
          <p>
            Conheça os três relatos disponibilizados no site original. Os vídeos
            abrem na fonte, por sua escolha.
          </p>
        </div>
        <div className="testimonial-grid">
          {[1, 2, 3].map((number) => (
            <a
              className="testimonial-card"
              key={number}
              href={`${site.original}videos/depoimento-${number}.mp4`}
              target="_blank"
              rel="noopener noreferrer"
              data-scroll-card
            >
              <div className="testimonial-image">
                <Image
                  src={`/images/official/capa-depoimento-${number}.png`}
                  alt={`Capa do depoimento ${number} publicado pela Player`}
                  width={400}
                  height={500}
                  sizes="(max-width: 700px) 90vw, 30vw"
                />
              </div>
              <div className="testimonial-caption">
                <h3>Depoimento {number}</h3>
                <span>Assistir no site oficial</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NextStep() {
  return (
    <section className="route-next section">
      <div className="container" data-scroll-heading>
        <p>O próximo passo começa com clareza.</p>
        <h2>
          Vamos olhar
          <br />
          <em>para o seu cenário?</em>
        </h2>
        <Link className="button" href="/simulador">
          Explorar simulador demonstrativo
        </Link>
        <p className="small-note">
          Percurso educativo, sem cadastro ou cálculo de economia tributária.
        </p>
      </div>
    </section>
  );
}
