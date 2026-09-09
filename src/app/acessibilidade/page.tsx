import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
export const metadata: Metadata = { title: "Acessibilidade" };
export default function Accessibility() {
  return (
    <section className="container section prose">
      <PageIntro
        label="ACESSIBILIDADE"
        title="Clareza também é poder navegar."
        description="O projeto busca uma experiência legível, responsiva e operável de diferentes maneiras."
      />
      <h2>Recursos disponíveis</h2>
      <ul>
        <li>Link para pular diretamente ao conteúdo.</li>
        <li>Navegação por teclado e foco visível.</li>
        <li>Hierarquia de títulos, campos rotulados e links descritivos.</li>
        <li>Respeito à preferência de redução de movimento do dispositivo.</li>
        <li>Controle para pausar os efeitos de rolagem na página atual.</li>
        <li>Conteúdo principal legível sem depender de animações.</li>
      </ul>
      <h2>Compromisso de melhoria</h2>
      <p>
        Testes automatizados ajudam a encontrar problemas, mas não substituem
        avaliação humana. Esta página não declara certificação de conformidade.
        Relatos técnicos podem ser registrados no{" "}
        <a
          href="https://github.com/cielioqueiroz/clone-player-contabilidade/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          repositório do projeto
        </a>
        .
      </p>
    </section>
  );
}
