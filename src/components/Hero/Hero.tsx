import { useState, useEffect } from 'react';
import HeroBackgroundFX from './HeroBackgroundFX';
import HeroImageLayer from './HeroImageLayer';
import HeroBadge from './HeroBadge';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';
import HeroButtons from './HeroButtons';
import HeroMetrics from './HeroMetrics';

export default function Hero ()  {
  const [latency, setLatency] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 5) + 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between overflow-hidden bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-stark-white">

      <HeroBackgroundFX />
      <HeroImageLayer />

      <section className="relative z-10 w-full lg:w-1/2 lg:order-1 lg:h-full flex flex-col justify-center px-margin-mobile lg:px-margin-desktop text-center lg:text-left mt-auto lg:mt-0 pb-24 lg:pb-0 pt-12 lg:pt-0">

        <HeroBadge />
        <HeroTitle />
        <HeroDescription />
        <HeroButtons />
        <HeroMetrics latency={latency} />

      </section>
    </main>
  );
}
