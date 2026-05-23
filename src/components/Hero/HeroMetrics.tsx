export default function HeroMetrics ({ latency } : { latency: number }) {
  return (
    <>
      <div className="lg:hidden grid grid-cols-3 border-t border-surface-border gap-gutter pt-10 pb-8">
        <div className="flex flex-col items-center">
          <span className="font-label-sm text-blood-red mb-1">LATENCY</span>
          <span className="font-label-md text-stark-white">0{latency}ms</span>
        </div>
        <div className="flex flex-col items-center border-x border-white/10">
          <span className="font-label-sm text-blood-red mb-1">UPTIME</span>
          <span className="font-label-md text-stark-white">99.9%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-label-sm text-blood-red mb-1">NODES</span>
          <span className="font-label-md text-stark-white">1,402</span>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-3 gap-8">
        <div className="hud-element">
          <span className="font-label-sm text-on-surface-variant opacity-60 mb-1">NETWORK LATENCY</span>
          <span className="font-label-md text-stark-white tabular-nums">0.0004 MS</span>
        </div>
        <div className="hud-element">
          <span className="font-label-sm text-on-surface-variant opacity-60 mb-1">UPTIME RECORD</span>
          <span className="font-label-md text-stark-white tabular-nums">99.999%</span>
        </div>
        <div className="hud-element">
          <span className="font-label-sm text-on-surface-variant opacity-60 mb-1">ACTIVE NODES</span>
          <span className="font-label-md text-stark-white font-bold tabular-nums">14,204</span>
        </div>
      </div>
    </>
  );
}
