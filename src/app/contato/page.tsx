import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { companyWhatsAppUrl } from "@/lib/reference-links";
import { site } from "@/content/catalog";
export const metadata: Metadata = { title: "Contato e referências" };
export default function Contact() {
  return (
    <section className="container section">
      <PageIntro
        label="CANAIS ORIGINAIS"
        title="A conversa continua no lugar certo."
        description="Este projeto não recebe solicitações nem agenda atendimentos. Para conhecer os serviços reais, consulte os canais publicados pela empresa."
      />
      <div className="specialty-grid">
        <article className="detail-panel">
          <h2>Player Contabilidade</h2>
          <p>
            O link abaixo abre o canal de WhatsApp indicado no site oficial.
            Revise a mensagem antes de enviá-la.
          </p>
          <a
            className="button"
            href={companyWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir WhatsApp da empresa ↗
          </a>
        </article>
        <article className="detail-panel">
          <h2>Conheça a referência</h2>
          <p>
            Consulte informações institucionais atualizadas diretamente nos
            canais da Player.
          </p>
          <a
            className="text-link"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram oficial ↗
          </a>
          <a
            className="text-link block-link"
            href={site.original}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website original ↗
          </a>
        </article>
      </div>
    </section>
  );
}
