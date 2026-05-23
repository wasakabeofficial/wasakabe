import { useState, useEffect } from 'react';
import { chica } from '../../assets';
import { MdSecurity, MdArrowForward } from 'react-icons/md';

export default function Hero ()  {
  const [latency, setLatency] = useState(0.0004);

  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = (Math.random() * 0.00005) - 0.000025;
      setLatency(prev => parseFloat((prev + jitter).toFixed(4)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative grow overflow-hidden flex flex-col bg-void-black text-on-surface font-body-md h-screen">
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-40"></div>
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black pointer-events-none"></div>
      
      <section className="max-w-max-width m-auto px-margin-desktop flex flex-col lg:flex-row h-full items-center relative z-10 grow">
        {/* Left Content Area */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blood-red/10 border-l-2 border-blood-red mb-8 w-fit">
            <MdSecurity className="text-[14px] text-primary" />
            <span className="font-label-sm text-primary tracking-[0.2em]">CRIMSON PROTOCOL ACTIVE</span>
          </div>
          
          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg leading-none mb-6 uppercase tracking-tighter text-stark-white">
            HYBRID INTELLIGENCE &<br />
            <span className="text-primary font-extrabold">CREATIVE PRODUCTION</span>
          </h1>
          
          <p className="font-body-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed opacity-80">
            A multi-disciplinary production studio where neural intelligence meets cinematic artistry. Deploying enterprise-grade software and high-end creative assets.
          </p>
          
          <div className="flex flex-wrap gap-6 mb-16">
            <button className="group relative px-8 py-4 bg-blood-red text-stark-white font-label-md font-bold tracking-widest flex items-center gap-3 transition-all hover:bg-red-800 active:scale-95 crimson-glow">
              AUTHENTICATE ACCESS
              <MdArrowForward className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="px-8 py-4 border border-surface-border bg-carbon-gray text-on-surface font-label-md font-bold tracking-widest hover:border-primary transition-all active:scale-95">
              VIEW PROTOCOLS
            </button>
          </div>
          
          {/* HUD Metadata Elements */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="hud-element">
              <div className="font-label-sm text-on-surface-variant opacity-60 mb-1">NETWORK LATENCY</div>
              <div className="font-label-md text-stark-white font-bold tabular-nums">{latency.toFixed(4)} MS</div>
            </div>
            <div className="hud-element">
              <div className="font-label-sm text-on-surface-variant opacity-60 mb-1">UPTIME RECORD</div>
              <div className="font-label-md text-stark-white font-bold tabular-nums">99.999%</div>
            </div>
            <div className="hud-element">
              <div className="font-label-sm text-on-surface-variant opacity-60 mb-1">ACTIVE NODES</div>
              <div className="font-label-md text-stark-white font-bold tabular-nums">14,204</div>
            </div>
          </div>
        </div>

        {/* Right Visual Area */}
        <div className="w-full lg:w-5xl h-full flex justify-end items-end relative order-1 lg:order-2">
          <div className="relative w-full aspect-4/5 lg:aspect-auto lg:h-[85vh] group">
            <div className="absolute inset-0 bg-blood-red/20 blur-[100px] rounded-full scale-75 -z-10 group-hover:scale-90 transition-transform duration-1000"></div>
            <img 
              alt="Wasaka Be Neural Operator" 
              className="w-full h-full object-contain object-bottom filter drop-shadow-[0_0_30px_rgba(139,0,0,0.3)] transition-transform duration-700 hover:scale-[1.02]" 
              src={chica}
            />
            {/* Floating Metadata Tags */}
            <div className="absolute top-1/4 right-0 flex flex-col gap-4 items-end animate-bounce" style={{ animationDuration: '5s' }}>
              <div className="bg-carbon-gray/80 border border-blood-red/40 px-3 py-1 font-label-sm text-[10px] text-primary backdrop-blur-md">
                BIO_ID: 99x-A
              </div>
              <div className="bg-carbon-gray/80 border border-blood-red/40 px-3 py-1 font-label-sm text-[10px] text-primary backdrop-blur-md">
                AUTH_LEVEL: OMEGA
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};


