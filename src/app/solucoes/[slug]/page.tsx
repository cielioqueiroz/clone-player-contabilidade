import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/catalog";
import { PageIntro } from "@/components/ui/page-intro";
import { companyWhatsAppUrl } from "@/lib/reference-links";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return {
    title: service?.title ?? "Solução não encontrada",
    description: service?.description,
  };
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <section className="container section">
      <Link className="text-link" href="/solucoes">
        Todas as soluções
      </Link>
      <PageIntro
        label="VISÃO ESTRATÉGICA"
        title={service.title}
        description={service.description}
      />
      <div className="detail-grid">
        <div>
          <h2>Uma rotina com mais contexto.</h2>
          <p>
            Esta apresentação conceitual reúne os principais temas desta frente.
            O escopo de qualquer serviço real depende de uma avaliação feita
            pela empresa responsável.
          </p>
        </div>
        <div className="detail-panel">
          <h2>O que entra na conversa</h2>
          <ul>
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            className="button"
            href={companyWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp da empresa original
          </a>
          <p className="small-note">
            Você sairá deste projeto demonstrativo. Nenhuma mensagem é enviada
            automaticamente.
          </p>
        </div>
      </div>
    </section>
  );
}
