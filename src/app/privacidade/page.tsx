import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
export const metadata: Metadata = { title: "Privacidade" };
export default function Privacy() {
  return (
    <section className="container section prose">
      <PageIntro
        label="PRIVACIDADE"
        title="Uma experiência com poucos dados."
        description="Esta página descreve o funcionamento deste projeto demonstrativo, e não a política da Player Contabilidade."
      />
      <h2>Interações locais</h2>
      <p>
        O explorador de cenários mantém as escolhas apenas na memória da página.
        Não há cadastro, banco de dados, envio de formulário, armazenamento
        local ou cookies definidos pelo aplicativo.
      </p>
      <h2>Hospedagem</h2>
      <p>
        A hospedagem pode processar dados técnicos de requisições, como endereço
        IP e registros de acesso, para entregar e proteger o site. Consulte a{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          política de privacidade da Vercel
        </a>
        .
      </p>
      <h2>Links externos</h2>
      <p>
        Ao abrir Instagram, Facebook, LinkedIn, WhatsApp, Google Maps ou o site
        original, você passa a utilizar serviços de terceiros sujeitos às
        respectivas políticas. Nenhuma mensagem é enviada automaticamente. O
        mapa incorporado só é conectado ao Google depois que você escolhe
        “Carregar mapa”.
      </p>
      <h2>Medição</h2>
      <p>
        Esta versão não instala ferramentas de analytics ou publicidade.
        Mudanças futuras no tratamento de dados exigem atualização desta página.
      </p>
    </section>
  );
}
