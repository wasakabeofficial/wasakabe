import { MdSecurity } from 'react-icons/md';
import type { IconType } from 'react-icons';

interface HeroDesktopViewProps {
  chica: string;
  TITLE: {
    first: string;
    highlightOnMobile: string;
    separator: string;
    highlightOnDesktop: string;
  };
  descriptionBase: string;
  buttons: Array<{
    label: string;
    mobileIcon: IconType;
    desktopIcon: IconType | null;
    primary: boolean;
  }>;
  metrics: Array<{
    desktop: { label: string; value: string };
  }>;
  desktopButtonClass: string;
}

export default function HeroDesktopView({
  chica,
  TITLE,
  descriptionBase,
  buttons,
  metrics,
  desktopButtonClass,
}: HeroDesktopViewProps) {
  return (
    <div className="hidden lg:flex min-h-screen w-full flex-row items-center justify-between overflow-hidden bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-star k-white relative pl-4 pr-4">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      <div className="scanline pointer-events-none" />

      {/* Visual / Image Section */}
      <div className="relative w-5xl h-full flex items-end justify-center order-2 pointer-events-auto overflow-hidden">
        <div className="absolute inset-0 bg-blood-red/20 blur-[100px] rounded-full scale-75 transition-transform duration-1000 -z-10" />
        <div className="relative w-140 h-full overflow-hidden">
          <img
            alt="Wasaka Be Neural Operator"
            className="w-full h-full object-contain object-bottom transition-transform duration-700 hover:scale-[1.02] mask-fade-up"
            src={chica}
          />
        </div>
        <div className="absolute top-1/4 right-4 flex flex-col gap-4 items-end animate-bounce animate-bounce-slow">
          <span className="bg-carbon-gray/80 border border-blood-red/40 px-3 py-1 font-label-sm text-[10px] text-primary backdrop-blur-md">BIO_ID: 99x-A</span>
          <span className="bg-carbon-gray/80 border border-blood-red/40 px-3 py-1 font-label-sm text-[10px] text-primary backdrop-blur-md">AUTH_LEVEL: OMEGA</span>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative z-10 w-1/2 order-1 h-full flex flex-col justify-center px-margin-desktop text-left pb-12 pt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blood-red/10 border-l-2 border-blood-red mb-8 w-fit">
          <MdSecurity className="text-[14px] text-primary" />
          <span className="font-label-sm text-primary tracking-[0.2em]">CRIMSON PROTOCOL ACTIVE</span>
        </div>

        <h1 className="font-display-lg display-title leading-none mb-6 uppercase tracking-tighter text-stark-white">
          {TITLE.first} {TITLE.highlightOnMobile} {TITLE.separator}<br />
          <span className="text-primary font-extrabold">{TITLE.highlightOnDesktop}</span>
        </h1>

        <p className={`font-body-lg max-w-xl ${descriptionBase}`}>
          A multi-disciplinary production studio where neural intelligence meets cinematic artistry. Deploying enterprise-grade software and high-end creative assets.
        </p>

        <div className="flex flex-wrap gap-6 mb-16">
          {buttons.map((item) => (
            <button
              key={item.label}
              className={`${desktopButtonClass} ${
                item.primary
                  ? 'group relative px-8 py-4 bg-blood-red text-stark-white flex items-center gap-3 hover:bg-red-800 crimson-glow'
                  : 'px-8 py-4 border border-surface-border bg-carbon-gray text-on-surface hover:border-primary'
              }`}
            >
              {item.label.toUpperCase()}
              {item.desktopIcon && <item.desktopIcon className="transition-transform group-hover:translate-x-1" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {metrics.map((item) => (
            <div key={item.desktop.label} className="hud-element flex flex-col">
              <span className="font-label-sm text-on-surface-variant opacity-60 mb-1">{item.desktop.label}</span>
              <span className="font-label-md text-stark-white tabular-nums">{item.desktop.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
