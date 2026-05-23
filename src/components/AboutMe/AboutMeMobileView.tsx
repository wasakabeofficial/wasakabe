import { yo } from '../../assets';
import { MdFlashOn } from 'react-icons/md';
import type { TextSegment } from './AboutMe';

interface AboutMeMobileViewProps {
  ABOUT_TITLE: {
    first: string;
    last: string;
    subtitle: string;
  };
  badgeText: string;
  bioIntro: TextSegment[];
  bioBody: TextSegment[];
  specifications: Array<{ label: string; }>;
  specificationsTitle: string;
  buttonText: string;
  biometric: {
    read: { label: string; value: string };
    origin: { label: string; value: string };
  };
}

function renderSegments (segments: TextSegment[]) {
  return segments.map((segment, index) => (
    <span key={index} className={segment.className}>{segment.text}</span>
  ));
}

export default function AboutMeMobileView ({
  ABOUT_TITLE,
  badgeText,
  bioIntro,
  bioBody,
  specifications,
  specificationsTitle,
  buttonText,
  biometric,
}: AboutMeMobileViewProps) {
  return (
    <div className="lg:hidden relative z-10 w-full scanline-effect min-h-screen flex flex-col items-center bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-stark-white overflow-hidden">
      <div className="scanline pointer-events-none" />

      <div className="px-margin-mobile py-16 flex flex-col items-center w-full">
        <header className="w-full text-center mb-12">
          <div className="inline-block px-3 py-1 mb-4 border border-blood-red/30 bg-blood-red/10">
            <span className="font-label-sm text-blood-red tracking-[0.2em] uppercase">{badgeText}</span>
          </div>

          <h1 className="font-display-lg-mobile display-title leading-none mb-6 uppercase tracking-tighter text-stark-white">
            {ABOUT_TITLE.first} <span className="text-blood-red"> {ABOUT_TITLE.last}</span>
          </h1>

          <p className="font-label-md text-on-surface-variant max-w-70 mx-auto opacity-80">
            {ABOUT_TITLE.subtitle}
          </p>
        </header>

        <div className="relative w-full aspect-square max-w-[320px] mx-auto mb-14">
          <div className="absolute -inset-4 border border-surface-border pointer-events-none" />

          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blood-red pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blood-red pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blood-red pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blood-red pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 bg-void-black/80 border-t border-blood-red/50 backdrop-blur-sm p-3 z-10">
            <div className="grid grid-cols-2 gap-base font-label-sm text-[9px] text-on-surface-variant">
              <div className="flex flex-col text-left">
                <span className="text-blood-red">{biometric.read.label}</span>
                <span className="text-stark-white">{biometric.read.value}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-blood-red">{biometric.origin.label}</span>
                <span className="text-stark-white">{biometric.origin.value}</span>
              </div>
            </div>
          </div>

          <div className="w-full h-full bg-carbon-gray overflow-hidden border border-surface-border grayscale hover:grayscale-0 transition-all duration-700">
            <img
              alt="Alan - System Architect"
              className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 scale-105 transition-transform duration-1000"
              src={yo}
            />
          </div>
        </div>

        <div className="w-full max-w-85 space-y-base mb-10">
          <p className="font-body-md text-stark-white leading-relaxed">
            {renderSegments(bioIntro)}
          </p>
          <p className="text-on-surface-variant leading-relaxed opacity-80">
            {renderSegments(bioBody)}
          </p>
        </div>

        <div className="w-full max-w-85 bg-carbon-gray p-6 border border-surface-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none select-none">
            <svg className="w-12 h-12 text-stark-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h6v2H6v-2zm8-4h4v2h-4v-2zm0 4h4v2h-4v-2zM5 8l2.5 2.5L5 13l-1.5-1.5L5.5 10 3.5 8 5 8zm12 8l-2.5-2.5L17 11l1.5 1.5L16.5 14l2.5 2.5L17 16z" />
            </svg>
          </div>

          <h3 className="font-label-sm text-shadow-rose-200 uppercase mb-2  flex items-center gap-2">
            <span className="w-2 h-2 bg-blood-red rounded-full status-pulse" />
            {specificationsTitle}
          </h3>

          <div className="space-y-6">
            {specifications.map((specification) => (
              <div key={specification.label}>
                <span className="font-label-md text-stark-white uppercase block mb-1">{specification.label}</span>
              </div>
            ))}
          </div>

        </div>

        <div className="w-full max-w-85 mt-12">
          <button className="w-full bg-blood-red text-stark-white font-label-md px-6 py-4 uppercase tracking-widest animate-pulse-custom flex items-center justify-between hover:bg-red-800 transition-colors active:scale-95">
            <span>{buttonText}</span>
            <MdFlashOn className="text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
