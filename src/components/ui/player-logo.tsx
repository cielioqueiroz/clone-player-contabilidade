import Image from "next/image";

export function PlayerLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Image
      className="player-logo"
      src={`/images/official/${footer ? "logo-rodape" : "logo-principal"}.png`}
      alt="Player Contabilidade"
      width={225}
      height={75}
      sizes="(max-width: 800px) 135px, 225px"
      quality={85}
    />
  );
}
