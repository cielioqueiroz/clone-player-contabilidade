import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { specialties } from "@/content/catalog";
export const metadata: Metadata = { title: "Especialidades" };
export default function Specialties() {
  return (
    <section className="container section">
      <PageIntro
        label="ESPECIALIDADES"
        title="O detalhe do setor muda a perspectiva."
        description="Dois contextos de operação, com desafios que merecem um olhar específico."
      />
      <div className="specialty-grid">
        {specialties.map((item) => (
          <article className="specialty-card" key={item.slug}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <Link className="text-link" href={`/especialidades/${item.slug}`}>
              Conhecer especialidade
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
