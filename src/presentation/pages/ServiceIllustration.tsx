import type { ReactElement } from "react";

/**
 * Ilustraciones abstractas por servicio — trazos geométricos, no fotografías,
 * para no comprometer la privacidad de clientes reales.
 */

function SoftwareIllustration() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="220" className="si-bg" />
      <g className="si-grid" opacity="0.35">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 55} x2="400" y2={i * 55} />
        ))}
      </g>
      <g className="si-nodes">
        <circle cx="90" cy="70" r="5" />
        <circle cx="190" cy="45" r="5" />
        <circle cx="290" cy="90" r="5" />
        <circle cx="140" cy="150" r="5" />
        <circle cx="250" cy="165" r="5" />
        <path d="M90 70 L190 45 L290 90 L250 165 L140 150 L90 70" className="si-lines" />
        <path d="M190 45 L140 150" className="si-lines" />
      </g>
      <text x="200" y="120" textAnchor="middle" className="si-glyph">{"</>"}</text>
    </svg>
  );
}

function CreativeIllustration() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="220" className="si-bg" />
      <g className="si-shapes">
        <rect x="40" y="50" width="120" height="80" rx="6" className="si-frame" />
        <circle cx="100" cy="90" r="22" className="si-outline" />
        <path d="M60 130 L100 68 L140 130 Z" className="si-outline" />
        <rect x="220" y="40" width="140" height="100" rx="6" className="si-frame-alt" />
        <circle cx="250" cy="60" r="7" className="si-dot" />
        <circle cx="275" cy="60" r="7" className="si-dot" />
        <circle cx="300" cy="60" r="7" className="si-dot" />
      </g>
      <text x="200" y="185" textAnchor="middle" className="si-caption">CONCEPTO · NARRATIVA · DIRECCIÓN</text>
    </svg>
  );
}

function AudiovisualIllustration() {
  const bars = [18, 40, 26, 55, 34, 62, 28, 48, 20, 58, 32, 44, 24, 50, 36, 20];
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="220" className="si-bg" />
      <g className="si-wave">
        {bars.map((h, i) => (
          <rect
            key={i}
            x={30 + i * 21}
            y={110 - h}
            width="10"
            height={h * 2}
            rx="3"
          />
        ))}
      </g>
      <circle cx="200" cy="110" r="34" className="si-outline" />
      <path d="M190 96 L216 110 L190 124 Z" className="si-play" />
    </svg>
  );
}

function MentorshipIllustration() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="220" className="si-bg" />
      <path d="M40 170 Q120 170 150 120 T260 70 T360 50" className="si-path" />
      <circle cx="40" cy="170" r="7" className="si-dot" />
      <circle cx="150" cy="120" r="7" className="si-dot" />
      <circle cx="260" cy="70" r="7" className="si-dot" />
      <circle cx="360" cy="50" r="10" className="si-dot-final" />
      <path d="M352 42 L368 42 L368 58" className="si-arrow" />
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, () => ReactElement> = {
  "software-engineering": SoftwareIllustration,
  "creative-direction": CreativeIllustration,
  audiovisual: AudiovisualIllustration,
  mentorship: MentorshipIllustration,
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
