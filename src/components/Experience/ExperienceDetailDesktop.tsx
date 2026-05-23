import type { ExperienceEntry } from './Experience';

interface ExperienceDetailDesktopProps {
  entry: ExperienceEntry;
}

export default function ExperienceDetailDesktop ({ entry }: ExperienceDetailDesktopProps) {
  return (
    <div className="bg-charcoal border border-blood-red/30 card-glow p-8 relative overflow-hidden">
      <div className="scanline pointer-events-none opacity-30" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-blood-red/10 border border-blood-red text-blood-red px-3 py-1 font-label-sm text-label-sm">
            [{entry.logId}]
          </span>
          <span className="font-label-sm text-[10px] text-on-surface-variant/40">
            /* active_record */
          </span>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="font-label-sm text-[10px] text-on-surface-variant uppercase mb-1">POSITION</div>
            <h2 className="font-headline-md text-headline-md text-stark-white uppercase tracking-tight">
              {entry.position}
            </h2>
            <div className="text-[13px] text-blood-red font-label-sm tracking-widest mt-1">
              {entry.company} <span className="text-on-surface-variant/30">//</span> {entry.tenure}
            </div>
          </div>
        </div>

        <p className="font-body-md text-on-surface-variant leading-relaxed mb-8 max-w-3xl border-l-2 border-blood-red/30 pl-4">
          {entry.description}
        </p>

        <div className="grid grid-cols-5 gap-8 mb-8">
          <div className="col-span-3">
            <div className="font-label-sm text-[10px] text-on-surface-variant uppercase border-b border-surface-border pb-1 mb-4">
              KEY_ACHIEVEMENTS
            </div>
            <ul className="space-y-3">
              {entry.achievements.map((item) => (
                <li key={item} className="flex items-start gap-3 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="w-1.5 h-1.5 bg-blood-red shrink-0 mt-1.5 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <div className="font-label-sm text-[10px] text-on-surface-variant uppercase border-b border-surface-border pb-1 mb-4">
              TECH_STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {entry.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-void-black border border-surface-border text-[10px] text-primary font-label-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {entry.metrics && entry.metrics.length > 0 && (
          <div className="border-t border-surface-border pt-6">
            <div className="flex items-start justify-center gap-20">
              {entry.metrics.map((metric, index) => (
                <div key={metric.label} className="text-center relative">
                  {index > 0 && (
                    <div className="absolute -left-10 top-0 bottom-0 w-px bg-surface-border/50 hidden lg:block" />
                  )}
                  <div className="font-label-sm text-[9px] text-on-surface-variant uppercase mb-2">{metric.label}</div>
                  <div className="font-display-lg text-[32px] text-stark-white leading-none mb-1">
                    {metric.value}
                    {metric.suffix && <span className="text-label-md text-on-surface-variant">{metric.suffix}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
