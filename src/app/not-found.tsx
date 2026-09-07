import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container section error-page">
      <p className="eyebrow">404 / NOVA DIREÇÃO</p>
      <h1>
        Este caminho
        <br />
        não está no mapa.
      </h1>
      <p>
        Explore as soluções ou volte ao início para encontrar outro ponto de
        partida.
      </p>
      <Link className="button" href="/">
        Voltar ao início ↗
      </Link>
    </section>
  );
}
