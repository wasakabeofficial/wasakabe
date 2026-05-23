import { useState, useEffect } from 'react';
import { chica } from '../../assets';
import { MdLockOpen, MdTerminal, MdArrowForward } from 'react-icons/md';
import type { IconType } from 'react-icons';
import HeroMobileView from './HeroMobileView';
import HeroDesktopView from './HeroDesktopView';

const descriptionBase = 'text-on-surface-variant mb-10 leading-relaxed opacity-80';

const TITLE = {
  first: 'HYBRID',
  highlightOnMobile: 'INTELLIGENCE',
  separator: '&',
  highlightOnDesktop: 'CREATIVE PRODUCTION',
};

const buttonBase = 'font-label-md tracking-widest transition-all active:scale-95';
const mobileButtonClass = `${buttonBase} rounded-none uppercase flex items-center justify-center gap-3 py-6`;
const desktopButtonClass = `${buttonBase} font-bold`;

type ButtonDefinition = {
  label: string;
  mobileIcon: IconType;
  desktopIcon: IconType | null;
  primary: boolean;
};

const buttons: ButtonDefinition[] = [
  { label: 'Authenticate Access', mobileIcon: MdLockOpen, desktopIcon: MdArrowForward, primary: true },
  { label: 'View Protocols', mobileIcon: MdTerminal, desktopIcon: null, primary: false },
];

export default function Hero ()  {
  const [latency, setLatency] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 5) + 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { mobile: { label: 'LATENCY', value: `0${latency}ms` }, desktop: { label: 'NETWORK LATENCY', value: '0.0004 MS' } },
    { mobile: { label: 'UPTIME', value: '99.9%' }, desktop: { label: 'UPTIME RECORD', value: '99.999%' } },
    { mobile: { label: 'NODES', value: '1,402' }, desktop: { label: 'ACTIVE NODES', value: '14,204' } },
  ];

  return (
    <main className="relative min-h-screen bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-stark-white">
      <HeroMobileView
        chica={chica}
        TITLE={TITLE}
        descriptionBase={descriptionBase}
        buttons={buttons}
        metrics={metrics}
        mobileButtonClass={mobileButtonClass}
      />
      <HeroDesktopView
        chica={chica}
        TITLE={TITLE}
        descriptionBase={descriptionBase}
        buttons={buttons}
        metrics={metrics}
        desktopButtonClass={desktopButtonClass}
      />
    </main>
  );
}
