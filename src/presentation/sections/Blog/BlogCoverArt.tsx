import type { ReactElement } from "react";
import "./BlogCoverArt.css";

/**
 * Portadas abstractas por categoría de blog — se usan mientras el post
 * no tenga cover_image_url propio (foto real subida vía Cloudinary).
 */

function hexPoints(cx: number, cy: number, r: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    points.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return points.join(" ");
}

function HexagonalArchitectureCover() {
  const center = { x: 200, y: 100 };
  const satellites = [
    { angle: -90, r: 96 },
    { angle: -18, r: 96 },
    { angle: 54, r: 90 },
    { angle: 126, r: 90 },
    { angle: 198, r: 96 },
  ].map(({ angle, r }) => {
    const rad = (angle * Math.PI) / 180;
    return { x: center.x + r * Math.cos(rad), y: center.y + r * Math.sin(rad) };
  });

  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" className="bca-bg" />
      {satellites.map((s, i) => (
        <line key={i} x1={center.x} y1={center.y} x2={s.x} y2={s.y} className="bca-line" />
      ))}
      {satellites.map((s, i) => (
        <polygon key={i} points={hexPoints(s.x, s.y, 20)} className="bca-hex-satellite" />
      ))}
      <polygon points={hexPoints(center.x, center.y, 42)} className="bca-hex-core" />
    </svg>
  );
}

function AiAgentsCover() {
  const nodes = [
    { x: 78, y: 56, variant: "a" },
    { x: 322, y: 56, variant: "b" },
    { x: 78, y: 152, variant: "b" },
    { x: 322, y: 152, variant: "a" },
  ] as const;
  const bubble = { x: 160, y: 74, width: 80, height: 52, rx: 16 };
  const bubbleCenter = { x: bubble.x + bubble.width / 2, y: bubble.y + bubble.height / 2 };

  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" className="bca-bg" />
      {nodes.map((n, i) => (
        <line key={i} x1={bubbleCenter.x} y1={bubbleCenter.y} x2={n.x} y2={n.y} className="bca-line" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="10" className={`bca-node-${n.variant}`} />
      ))}
      <rect
        x={bubble.x}
        y={bubble.y}
        width={bubble.width}
        height={bubble.height}
        rx={bubble.rx}
        className="bca-bubble"
      />
      <path d={`M${bubble.x + 22} ${bubble.y + bubble.height} L${bubble.x + 14} ${bubble.y + bubble.height + 14} L${bubble.x + 34} ${bubble.y + bubble.height} Z`} className="bca-bubble" />
      <circle cx={bubbleCenter.x - 16} cy={bubbleCenter.y} r="4" className="bca-dot" />
      <circle cx={bubbleCenter.x} cy={bubbleCenter.y} r="4" className="bca-dot" />
      <circle cx={bubbleCenter.x + 16} cy={bubbleCenter.y} r="4" className="bca-dot" />
    </svg>
  );
}

function CreativeCrossoverCover() {
  const bars = [20, 38, 26, 50, 32, 58, 24, 44];
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" className="bca-bg" />
      <g className="bca-wave">
        {bars.map((h, i) => (
          <rect key={i} x={36 + i * 20} y={100 - h} width="9" height={h * 2} rx="3" />
        ))}
      </g>
      <text x="316" y="112" textAnchor="middle" className="bca-glyph">{"</>"}</text>
    </svg>
  );
}

function DefaultCover() {
  const lines = [70, 130, 100, 150, 80];
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" className="bca-bg" />
      <text x="60" y="86" className="bca-quote">"</text>
      <g className="bca-default-lines">
        {lines.map((w, i) => (
          <rect key={i} x="60" y={104 + i * 16} width={w} height="7" rx="3.5" />
        ))}
      </g>
    </svg>
  );
}

const COVERS: Record<string, () => ReactElement> = {
  "arquitectura-software": HexagonalArchitectureCover,
  "ingenieria-ia": AiAgentsCover,
  "produccion-creativa": CreativeCrossoverCover,
};

export default function BlogCoverArt({ categorySlug }: { categorySlug?: string }) {
  const Cover = (categorySlug && COVERS[categorySlug]) || DefaultCover;
  return (
    <div className="blog-cover-art" aria-hidden="true">
      <Cover />
    </div>
  );
}
