"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { navigation } from "@/content/catalog";

export function SiteHeader() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          className="wordmark"
          href="/"
          aria-label="Player conceito — início"
        >
          <span className="brand-symbol" aria-hidden="true">
            ↗
          </span>{" "}
          player
          <span className="wordmark-caption">CONTABILIDADE / CONCEITO</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="button button-small header-cta" href="/simulador">
          Explore seu cenário <span aria-hidden="true">↗</span>
        </Link>
        <details ref={menu} className="mobile-nav">
          <summary>
            Menu <span aria-hidden="true">+</span>
          </summary>
          <nav
            aria-label="Navegação móvel"
            onClick={() => {
              if (menu.current) menu.current.open = false;
            }}
          >
            {navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  pathname.startsWith(link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
            <Link href="/simulador">Explore seu cenário</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
