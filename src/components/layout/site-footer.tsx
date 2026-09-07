import Link from "next/link";
import { navigation, site } from "@/content/catalog";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="footer-brand" href="/">
              player<span>↗</span>
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
        <div className="footer-bottom">
          <p>Projeto independente de demonstração · Ciélio Queiroz</p>
          <a href={site.original} target="_blank" rel="noopener noreferrer">
            Visitar o site oficial ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
