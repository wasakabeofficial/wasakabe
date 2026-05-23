import type { IconType } from 'react-icons';

interface HeroMobileViewProps {
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
    primary: boolean;
  }>;
  metrics: Array<{
    mobile: { label: string; value: string };
    desktop: { label: string };
  }>;
  mobileButtonClass: string;
}

export default function HeroMobileView({
  chica,
  TITLE,
  descriptionBase,
  buttons,
  metrics,
  mobileButtonClass,
}: HeroMobileViewProps) {
  return (
    <div className="lg:hidden min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-stark-white relative p-2">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      <div className="scanline pointer-events-none" />

      {/* Visual / Image Section */}
      <div className="absolute inset-0 w-full flex items-end justify-center pointer-events-none overflow-hidden">
        <div className="relative w-140 h-full overflow-hidden">
          <img
            alt="Wasaka Be Neural Operator"
            className="w-full h-full object-cover object-top mask-fade-up"
            src={chica}
          />
        </div>
        <div className="absolute inset-0 crimson-gradient-overlay" />
      </div>

      {/* Content Section */}
      <section className="relative z-10 w-full flex flex-col justify-center px-margin-mobile text-center mt-auto pb-12 pt-12">
        <h1 className="font-display-lg-mobile display-title leading-none mb-6 uppercase tracking-tighter text-stark-white">
          {TITLE.first} <span className="text-blood-red">{TITLE.highlightOnMobile}</span> {TITLE.separator} {TITLE.highlightOnDesktop}
        </h1>

        <p className={`font-body-md max-w-sm mx-auto ${descriptionBase}`}>
          Architecting the next generation of digital assets through neural engineering and aggressive visual precision.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto mb-12">
          {buttons.map((item) => (
            <button
              key={item.label}
              className={`${mobileButtonClass} ${
                item.primary
                  ? 'bg-blood-red text-stark-white border border-blood-red'
                  : 'bg-transparent border border-surface-border text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <item.mobileIcon className="text-[20px]" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 border-t border-surface-border gap-gutter pt-10 pb-8">
          {metrics.map((item, index) => (
            <div key={item.desktop.label} className={`flex flex-col items-center ${index === 1 ? 'border-x border-white/10' : ''}`}>
              <span className="font-label-sm text-blood-red mb-1">{item.mobile.label}</span>
              <span className="font-label-md text-stark-white">{item.mobile.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
