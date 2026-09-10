import Link from "next/link";
import Image from "next/image";
import { navigation, site } from "@/content/catalog";
import { PlayerLogo } from "@/components/ui/player-logo";
import { SocialIcon } from "@/components/ui/social-icon";
import { LocationMap } from "@/components/features/location-map";
import { company, credentials } from "@/content/company";
import { companyWhatsAppUrl } from "@/lib/reference-links";

const socialLinks = [
  { label: "Instagram", href: site.instagram, icon: "instagram" },
  { label: "Facebook", href: site.facebook, icon: "facebook" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
  { label: "WhatsApp", href: companyWhatsAppUrl(), icon: "whatsapp" },
] as const;

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
        <section className="footer-trust" aria-labelledby="footer-trust-title">
          <div className="footer-section-heading">
            <p className="eyebrow">Reconhecimentos publicados</p>
            <h2 id="footer-trust-title">Selos apresentados pela empresa.</h2>
            <p>
              Identidades institucionais reproduzidas como referência ao
              material público da Player.
            </p>
          </div>
          <div className="footer-badges">
            {credentials.map((credential, index) => (
              <div className="footer-badge" key={credential.title}>
                <Image
                  src={`/images/official/selo-${index + 1}.png`}
                  alt={credential.title}
                  width={82}
                  height={82}
                  sizes="82px"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
        <div className="footer-connect">
          <section aria-labelledby="footer-social-title">
            <p className="eyebrow">Canais oficiais</p>
            <h2 id="footer-social-title">Encontre a Player.</h2>
            <p>
              Os links abaixo levam aos canais externos da empresa original.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} da Player Contabilidade`}
                  key={social.label}
                >
                  <SocialIcon name={social.icon} />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </section>
          <section
            className="footer-location"
            aria-labelledby="footer-location-title"
          >
            <div className="footer-location-heading">
              <div>
                <p className="eyebrow">Sede em Palmas</p>
                <h2 id="footer-location-title">Onde a conversa acontece.</h2>
              </div>
              <a href={site.maps} target="_blank" rel="noopener noreferrer">
                Abrir no Google Maps
              </a>
            </div>
            <p>{site.address}</p>
            <LocationMap />
          </section>
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
          </div>
          <div>
            <h2>Atendimento da empresa</h2>
            <a href={company.supportPhone}>SAC — ligar para 0800</a>
            <a href={company.supportPhone}>
              Canal de denúncias — ligar para 0800
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
