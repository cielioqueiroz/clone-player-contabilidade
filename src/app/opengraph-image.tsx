import { ImageResponse } from "next/og";
export const alt =
  "Player conceito — Seu próximo movimento. Mais claro. Projeto de Ciélio Queiroz.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#111310",
          color: "#F3F0E7",
          padding: "64px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
          }}
        >
          <span style={{ color: "#F7B54A", fontSize: 46, fontWeight: 700 }}>
            player ↗
          </span>
          <span style={{ color: "#B8BBAF", fontSize: 18 }}>
            DESIGN & TECNOLOGIA / CONCEITO
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 78,
            lineHeight: 1.07,
            letterSpacing: -4,
          }}
        >
          <span>Seu próximo movimento.</span>
          <span style={{ color: "#F7B54A" }}>Mais claro.</span>
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #3C4135",
            paddingTop: 22,
            color: "#B8BBAF",
            fontSize: 20,
            justifyContent: "space-between",
          }}
        >
          <span>Estudo independente · Ciélio Queiroz</span>
          <span>Não é o site oficial da empresa.</span>
        </div>
      </div>
    ),
    size,
  );
}
