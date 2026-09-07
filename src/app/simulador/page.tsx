import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { ScenarioExplorer } from "@/components/features/scenario-explorer";
export const metadata: Metadata = { title: "Explore seu cenário" };
export default function Simulator() {
  return (
    <section className="container section">
      <PageIntro
        label="03 / PONTO DE PARTIDA"
        title="Qual é o seu próximo movimento?"
        description="Uma experiência local para explorar possibilidades. Sem cadastro, coleta de dados ou cálculo de impostos."
      />
      <ScenarioExplorer />
    </section>
  );
}
