export const priorities = [
  "Organizar o financeiro",
  "Entender os tributos",
  "Preparar a equipe",
] as const;
export type Priority = (typeof priorities)[number];

export function getRecommendation(
  value: unknown,
): { title: string; href: string; text: string } | null {
  if (value === "Organizar o financeiro")
    return {
      title: "Conheça o BPO Financeiro",
      href: "/solucoes/bpo-financeiro",
      text: "Comece pela organização das rotinas e pela visibilidade do fluxo de caixa.",
    };
  if (value === "Entender os tributos")
    return {
      title: "Explore o Planejamento Tributário",
      href: "/solucoes/planejamento-tributario",
      text: "A avaliação do regime e das obrigações depende do contexto de cada empresa.",
    };
  if (value === "Preparar a equipe")
    return {
      title: "Veja os Treinamentos",
      href: "/solucoes/treinamentos",
      text: "Conhecimento aplicado ajuda a tornar os processos mais consistentes.",
    };
  return null;
}
