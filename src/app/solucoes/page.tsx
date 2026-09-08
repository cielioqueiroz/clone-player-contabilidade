import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { ServiceGrid } from "@/components/sections/service-grid";
export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Explore cinco frentes de atuação contábil neste projeto conceitual independente.",
};
export default function Solutions() {
  return (
    <section className="container section">
      <PageIntro
        label="SOLUÇÕES"
        title="Uma visão completa. Em cinco frentes."
        description="Explore os temas da contabilidade e encontre o que faz sentido para o seu momento. Os links de WhatsApp apontam para o canal publicado pela empresa original."
      />
      <h2 className="sr-only">Áreas de atuação</h2>
      <ServiceGrid detailed />
    </section>
  );
}
