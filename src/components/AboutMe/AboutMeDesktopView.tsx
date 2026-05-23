import { yo } from '../../assets';
import { MdFingerprint, MdQrCode, MdFlashOn } from 'react-icons/md';
import type { TextSegment } from './AboutMe';

interface AboutMeDesktopViewProps {
  ABOUT_TITLE: {
    first: string;
    last: string;
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
  protocolLabel: string;
}

function renderSegments (segments: TextSegment[]) {
  return segments.map((segment, index) => (
    <span key={index} className={segment.className}>{segment.text}</span>
  ));
}

export default function AboutMeDesktopView ({
  ABOUT_TITLE,
  badgeText,
  bioIntro,
  bioBody,
  specifications,
  specificationsTitle,
  buttonText,
  biometric,
  protocolLabel,
}: AboutMeDesktopViewProps) {
  return (
    <div className="hidden lg:flex min-h-screen flex-row items-center justify-between overflow-hidden bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-stark-white relative pl-4 pr-4">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      <div className="scanline pointer-events-none" />

      <section className="relative z-10 w-1/2 order-1 h-full flex flex-col justify-center px-margin-desktop text-left pb-24 pt-12">
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-blood-red/10 border-l-2 border-blood-red mb-8 w-fit">
          <MdFingerprint className="text-[14px] text-primary" />
          <span className="font-label-sm text-primary tracking-[0.2em] uppercase">{badgeText}</span>
        </div>

        <h1 className="font-display-lg display-title leading-none mb-6 uppercase tracking-tighter text-stark-white">
          {ABOUT_TITLE.first}<br />
          <span className="text-primary font-extrabold"> {ABOUT_TITLE.last}</span>
        </h1>

        <p className="font-body-lg text-stark-white leading-relaxed mb-2">
          {renderSegments(bioIntro)}
        </p>
        <p className="font-body-lg text-on-surface-variant leading-relaxed opacity-80 mb-10">
          {renderSegments(bioBody)}
        </p>

        <div className="border-t border-surface-border pt-gutter space-y-6 mb-16">
          <span className="font-label-sm text-blood-red block mb-base">{specificationsTitle}</span>
          <div className="grid grid-cols-3 gap-8">
            {specifications.map((specification) => (
              <div key={specification.label} className="hud-element">
                <span className="font-label-md text-on-surface uppercase block mb-1">{specification.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button className="bg-blood-red text-stark-white font-label-md px-10 py-4 uppercase tracking-widest animate-pulse-custom flex items-center gap-3 hover:bg-red-800 transition-colors active:scale-95">
            <span>{buttonText}</span>
            <MdFlashOn className="text-[18px]" />
          </button>
        </div>
      </section>

      <div className="relative w-5xl order-2 h-full flex items-end justify-center pointer-events-auto overflow-hidden group">
        <div className="absolute inset-0 bg-blood-red/20 blur-[100px] rounded-full scale-75 transition-transform duration-1000 -z-10" />
        <div className="relative w-140 h-full overflow-hidden bg-carbon-gray transition-transform duration-700 ease-out group-hover:scale-105">
          <img
            alt="SYSTEM ARCHITECT ALAN"
            className="w-full h-full object-contain object-bottom transition-opacity duration-700 filter grayscale hover:grayscale-0 opacity-80 group-hover:opacity-100 mask-fade-up"
            src={yo}
          />

          <div className="active-scanline opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="absolute inset-0 p-base flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <span className="font-label-sm bg-void-black/80 px-2 py-1 text-blood-red border-l border-blood-red">{protocolLabel}</span>
              <MdQrCode className="text-blood-red text-body-md" />
            </div>

            <div className="w-full h-px bg-blood-red/30 relative">
              <div className="absolute -top-1 left-0 w-2 h-2 bg-blood-red rounded-full" />
              <div className="absolute -top-1 right-0 w-2 h-2 bg-blood-red rounded-full" />
            </div>

            <div className="bg-void-black/80 p-gutter border-t border-blood-red/50 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-base font-label-sm text-[10px] text-on-surface-variant">
                <div className="flex flex-col">
                  <span className="text-blood-red">{biometric.read.label}</span>
                  <span>{biometric.read.value}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-blood-red">{biometric.origin.label}</span>
                  <span>{biometric.origin.value}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
