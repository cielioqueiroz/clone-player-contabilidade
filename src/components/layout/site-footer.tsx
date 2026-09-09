import Link from "next/link";
import { navigation, site } from "@/content/catalog";
import { PlayerLogo } from "@/components/ui/player-logo";
import { company } from "@/content/company";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="footer-brand" href="/">
              <PlayerLogo footer />
            </Link>
            <p>Clareza para o próximo movimento.</p>
          </div>
          <nav aria-label="Navegação do rodapé">
            {navigation.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/acessibilidade">Acessibilidade</Link>
          </nav>
        </div>
        <div className="footer-company">
          <div>
            <h2>Canais da Player</h2>
            <a href="tel:08008001385">0800 800 1385</a>
            <a href="tel:+556139950174">(61) 3995-0174</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          <div>
            <h2>Em Palmas, Tocantins</h2>
            <a href={site.maps} target="_blank" rel="noopener noreferrer">
              {site.address}
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram da empresa
            </a>
          </div>
          <div>
            <h2>Atendimento da empresa</h2>
            <a href={company.support} target="_blank" rel="noopener noreferrer">
              SAC
            </a>
            <a href={company.support} target="_blank" rel="noopener noreferrer">
              Canal de denúncias
            </a>
            <p>Os canais externos pertencem à empresa original.</p>
          </div>
        </div>
        <p className="corporate-record">
          Identificação publicada pela empresa: CNPJ {company.cnpj} ·{" "}
          {company.registrations}
        </p>
        <div className="footer-bottom">
          <p>Projeto independente de demonstração · Ciélio Queiroz</p>
          <a href={site.original} target="_blank" rel="noopener noreferrer">
            Visitar o site oficial
          </a>
        </div>
      </div>
    </footer>
  );
}
