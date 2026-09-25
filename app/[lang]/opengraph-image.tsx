import { ImageResponse } from "next/og";

export const alt = "Miguel Liébana · Web, IA, administración y formación";
export const contentType = "image/png";
export const size = { height: 630, width: 1200 };

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#f7f8fa",
        backgroundImage:
          "linear-gradient(rgba(36, 88, 214, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(36, 88, 214, 0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        color: "#0e1116",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.82)",
          border: "2px solid rgba(14, 17, 22, 0.9)",
          borderRadius: 34,
          boxShadow: "24px 24px 0 #2458d6, 0 32px 70px rgba(36, 88, 214, 0.22)",
          display: "flex",
          height: 322,
          position: "relative",
          transform: "rotate(-2deg)",
          width: 322,
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontFamily: "monospace",
            fontSize: 116,
            fontWeight: 700,
            height: "100%",
            justifyContent: "center",
            letterSpacing: 0,
            width: "100%",
          }}
        >
          <span>ml</span>
          <span style={{ color: "#2458d6" }}>_</span>
        </div>
        <div
          style={{
            background: "rgba(120, 196, 255, 0.58)",
            height: 28,
            position: "absolute",
            right: 42,
            top: -15,
            transform: "rotate(5deg)",
            width: 116,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginLeft: 92, width: 560 }}>
        <div style={{ color: "#2458d6", display: "flex", fontFamily: "monospace", fontSize: 24, marginBottom: 22 }}>
          00 / PORTFOLIO
        </div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 800, letterSpacing: 0, lineHeight: 1.02 }}>Miguel Liébana</div>
        <div style={{ color: "#3a4049", display: "flex", fontSize: 28, lineHeight: 1.35, marginTop: 22 }}>
          Desarrollo web · IA · formación digital · administración
        </div>
        <div style={{ background: "#2458d6", display: "flex", height: 5, marginTop: 34, width: 168 }} />
      </div>
    </div>,
    size,
  );
}
