import type { ReactElement } from "react";

/**
 * Ilustraciones abstractas por servicio — trazos geométricos, no fotografías,
 * para no comprometer la privacidad de clientes reales.
 */

function SoftwareIllustration() {
  const lines: { indent: number; width: number; variant: "kw" | "str" | "fn" | "txt" }[] = [
    { indent: 0, width: 70, variant: "kw" },
    { indent: 1, width: 130, variant: "fn" },
    { indent: 2, width: 100, variant: "txt" },
    { indent: 2, width: 150, variant: "str" },
    { indent: 2, width: 80, variant: "txt" },
    { indent: 1, width: 40, variant: "txt" },
    { indent: 0, width: 55, variant: "kw" },
    { indent: 1, width: 115, variant: "txt" },
  ];

  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="220" className="si-bg" />

      <rect x="24" y="20" width="352" height="180" rx="10" className="si-frame" />
      <WindowChrome />

      <g className="si-code">
        {lines.map((line, i) => (
          <rect
            key={i}
            x={40 + line.indent * 18}
            y={64 + i * 16}
            width={line.width}
            height="7"
            rx="3.5"
            className={`si-code-${line.variant}`}
          />
        ))}
        <rect x={40} y={64 + lines.length * 16} width="7" height="10" className="si-cursor" />
      </g>
    </svg>
  );
}

function WindowChrome() {
  return (
    <g className="si-window-bar">
      <rect x="24" y="20" width="352" height="28" rx="10" className="si-window-titlebar" />
      <rect x="24" y="38" width="352" height="10" className="si-window-titlebar" />
      <circle cx="44" cy="34" r="5" className="si-dot-red" />
      <circle cx="60" cy="34" r="5" className="si-dot-amber" />
      <circle cx="76" cy="34" r="5" className="si-dot-green" />
    </g>
  );
}

function CreativeIllustration() {
  const swatches = ["kw", "fn", "str", "txt", "kw"] as const;
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="220" className="si-bg" />

      <rect x="24" y="20" width="352" height="180" rx="10" className="si-frame" />
      <WindowChrome />

      <g className="si-moodboard">
        <rect x="40" y="64" width="110" height="70" rx="6" className="si-tile-a" />
        <rect x="158" y="64" width="80" height="44" rx="6" className="si-tile-b" />
        <rect x="158" y="114" width="80" height="20" rx="4" className="si-tile-c" />
        <rect x="246" y="64" width="90" height="70" rx="6" className="si-tile-b" />
        <circle cx="95" cy="99" r="16" className="si-outline" />
        <path d="M70 122 L95 80 L120 122 Z" className="si-outline" />
      </g>

      <g className="si-swatches">
        {swatches.map((v, i) => (
          <circle key={i} cx={52 + i * 22} cy={158} r="8" className={`si-code-${v}`} />
        ))}
      </g>
      <text x="200" y="185" textAnchor="middle" className="si-caption">CONCEPTO · NARRATIVA · DIRECCIÓN</text>
    </svg>
  );
}

function AudiovisualIllustration() {
  const clips = [
    { width: 60, variant: "kw" },
    { width: 90, variant: "fn" },
    { width: 45, variant: "txt" },
    { width: 100, variant: "kw" },
    { width: 40, variant: "str" },
  ] as const;
  let cursor = 40;

  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="220" className="si-bg" />

      <rect x="24" y="20" width="352" height="180" rx="10" className="si-frame" />
      <WindowChrome />

      <rect x="40" y="64" width="320" height="70" rx="6" className="si-preview" />
      <circle cx="200" cy="99" r="20" className="si-outline" />
      <path d="M193 88 L215 99 L193 110 Z" className="si-play" />

      <g className="si-timeline">
        <rect x="40" y="150" width="320" height="20" rx="4" className="si-timeline-track" />
        {clips.map((clip, i) => {
          const x = cursor;
          cursor += clip.width + 6;
          return (
            <rect key={i} x={x} y="153" width={clip.width} height="14" rx="3" className={`si-code-${clip.variant}`} />
          );
        })}
        <rect x="150" y="146" width="2" height="28" className="si-cursor" />
      </g>
    </svg>
  );
}

function MentorshipIllustration() {
  const checklist = [true, true, false];
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="220" className="si-bg" />

      <rect x="24" y="20" width="352" height="180" rx="10" className="si-frame" />
      <WindowChrome />

      <g className="si-call">
        <rect x="40" y="64" width="140" height="80" rx="8" className="si-tile-b" />
        <circle cx="110" cy="94" r="16" className="si-outline" />
        <path d="M85 132 Q110 108 135 132 Z" className="si-outline" />

        <rect x="196" y="64" width="140" height="80" rx="8" className="si-tile-b" />
        <circle cx="266" cy="94" r="16" className="si-code-fn" />
        <path d="M241 132 Q266 108 291 132 Z" className="si-code-fn" opacity="0.5" />
      </g>

      <g className="si-checklist">
        {checklist.map((done, i) => (
          <g key={i} transform={`translate(40, ${160 + i * 14})`}>
            <circle cx="6" cy="0" r="6" className={done ? "si-code-kw" : "si-code-txt"} />
            {done && <path d="M3 0 L5.5 2.5 L9.5 -3" className="si-check-mark" />}
            <rect x="20" y="-3.5" width={110 - i * 20} height="6" rx="3" className="si-code-txt" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function CybersecurityIllustration() {
  const hosts = [
    { cx: 210, cy: 72, status: "si-dot-green" },
    { cx: 268, cy: 96, status: "si-dot-amber" },
    { cx: 250, cy: 140, status: "si-dot-green" },
    { cx: 178, cy: 148, status: "si-dot-red" },
  ] as const;
  const scanRows = [
    { width: 26, variant: "kw" },
    { width: 26, variant: "fn" },
    { width: 26, variant: "kw" },
  ] as const;

  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="220" className="si-bg" />

      <rect x="24" y="20" width="352" height="180" rx="10" className="si-frame" />
      <WindowChrome />

      <g className="si-network">
        {hosts.map((h, i) => (
          <line key={i} x1="110" y1="100" x2={h.cx} y2={h.cy} className="si-outline" />
        ))}
        <circle cx="110" cy="100" r="20" className="si-code-kw" />
        <path d="M103 100 L108 105 L118 92" className="si-check-mark" />
        {hosts.map((h, i) => (
          <circle key={i} cx={h.cx} cy={h.cy} r="9" className={h.status} />
        ))}
      </g>

      <g className="si-scanrows">
        {scanRows.map((row, i) => (
          <g key={i} transform={`translate(40, ${152 + i * 14})`}>
            <rect x="0" y="-4" width={row.width} height="8" rx="3" className={`si-code-${row.variant}`} />
            <rect x="34" y="-4" width={80 - i * 12} height="8" rx="3" className="si-code-txt" />
          </g>
        ))}
      </g>
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, () => ReactElement> = {
  "software-engineering": SoftwareIllustration,
  "creative-direction": CreativeIllustration,
  audiovisual: AudiovisualIllustration,
  mentorship: MentorshipIllustration,
  cybersecurity: CybersecurityIllustration,
};

export default function ServiceIllustration({ slug }: { slug: string }) {
  const Illustration = ILLUSTRATIONS[slug];
  if (!Illustration) return null;
  return (
    <div className="service-illustration" aria-hidden="true">
      <Illustration />
    </div>
  );
}
