import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { specialties } from "@/content/catalog";
import { PageIntro } from "@/components/ui/page-intro";
import {
  OperationalBenefits,
  NextStep,
} from "@/components/sections/company-sections";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return specialties.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title:
      specialties.find((item) => item.slug === slug)?.title ?? "Especialidade",
  };
}
export default async function Specialty({ params }: Props) {
  const { slug } = await params;
  const item = specialties.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return (
    <>
      <section className="container section">
        <Link className="text-link" href="/especialidades">
          Especialidades
        </Link>
        <PageIntro
          label="ESPECIALIDADE"
          title={item.title}
          description={item.description}
        />
        <div className="tag-list">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="detail-panel">
          <h2>Conecte o contexto à solução.</h2>
          <p>
            Explore a organização financeira, a leitura contábil e o
            planejamento para entender como essas frentes se relacionam.
          </p>
          <Link className="button" href="/solucoes">
            Explorar soluções
          </Link>
        </div>
      </section>
      <OperationalBenefits />
      <NextStep />
    </>
  );
}
