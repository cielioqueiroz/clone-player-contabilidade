export type Service = {
  slug: string;
  title: string;
  description: string;
  items: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "bpo-financeiro",
    title: "BPO Financeiro",
    description:
      "Uma operação financeira organizada para enxergar o próximo passo.",
    items: [
      "Organização de contas a pagar e receber",
      "Processamento da folha de pagamento",
      "Rotinas de tesouraria e fluxo de caixa",
      "Implantação e integração de sistemas financeiros",
    ],
  },
  {
    slug: "assessoria-contabil",
    title: "Assessoria Contábil Completa",
    description: "Informação contábil que aproxima os números das decisões.",
    items: [
      "Leitura de relatórios e indicadores",
      "Acompanhamento de ativos e passivos",
      "Orientação sobre obrigações da empresa",
    ],
  },
  {
    slug: "legalizacao",
    title: "Legalização",
    description:
      "Clareza para estruturar, regularizar e transformar um negócio.",
    items: [
      "Jornada de abertura e encerramento",
      "Organização cadastral e documentação",
      "Certificação digital",
      "Marcas e patentes",
      "Revisão tributária do cadastro de produtos",
    ],
  },
  {
    slug: "treinamentos",
    title: "Treinamentos",
    description:
      "Conhecimento aplicado à rotina de quem faz a empresa acontecer.",
    items: [
      "Formação corporativa e educação financeira para equipes",
      "Práticas de compliance e ética",
      "Capacitação para inovação e atualização profissional",
    ],
  },
  {
    slug: "planejamento-tributario",
    title: "Planejamento Tributário",
    description:
      "Mais contexto para avaliar escolhas tributárias com responsabilidade.",
    items: [
      "Análise de regimes e cenários",
      "Revisão de tributos pagos e possibilidades de recuperação",
      "Consultoria fiscal e tributária",
      "Auditoria fiscal e tributária",
      "Avaliação de enquadramento em regimes especiais",
      "Planejamento financeiro e orçamento",
    ],
  },
];

export const specialties = [
  {
    slug: "farmacias-e-drogarias",
    title: "Farmácias e drogarias",
    description:
      "Produtos, estoques e regras específicas. Uma operação que pede atenção aos detalhes.",
    tags: ["Varejo farma", "Gestão de estoque", "Contexto tributário"],
  },
  {
    slug: "materiais-de-construcao",
    title: "Materiais de construção",
    description:
      "Do giro do estoque à leitura das margens: informação para uma gestão mais consciente.",
    tags: ["Varejo", "Margens", "Organização financeira"],
  },
] as const;

export const navigation = [
  { href: "/solucoes", label: "Soluções" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/sobre-nos", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

export const site = {
  name: "Player — Conceito",
  url: "https://clone-player-contabilidade.vercel.app",
  description:
    "Um estudo independente de design e tecnologia para uma contabilidade mais clara. Projeto de demonstração de Ciélio Queiroz.",
  original: "https://playercontabilidade.com/",
  instagram: "https://www.instagram.com/playercontabilidade/",
  pharmacyInstagram: "https://www.instagram.com/contadoresdefarmacia/",
  maps: "https://www.google.com/maps?cid=175021512181408638",
  address: "Av. Siqueira Campos, Jardim Aureny III (Taquaralto), Palmas–TO",
};
