import type { ExperienceEntry } from './Experience';

interface ExperienceDetailMobileProps {
  entry: ExperienceEntry;
}

export default function ExperienceDetailMobile ({ entry }: ExperienceDetailMobileProps) {
  return (
    <div className="px-5 pb-6 pt-3">
      <div className="bg-charcoal border border-blood-red/40 card-glow p-6">
        <div className="mb-5 pb-4 border-b border-surface-border">
          <div className="font-label-sm text-label-sm text-on-surface-variant/90 uppercase mb-1">POSITION</div>
          <h2 className="font-label-md text-body-md text-stark-white uppercase font-bold">{entry.position}</h2>
          <div className="text-label-sm text-blood-red font-label-sm tracking-widest mt-1">{entry.company} // {entry.tenure}</div>
        </div>

        <p className="font-body-md text-on-surface-variant/90 leading-relaxed mb-6">
          {entry.description}
        </p>

        <div className="mb-6">
          <div className="font-label-sm text-label-sm text-on-surface-variant/90 uppercase border-b border-surface-border pb-1 mb-3">
            KEY_ACHIEVEMENTS
          </div>
          <ul className="space-y-3">
            {entry.achievements.map((item) => (
              <li key={item} className="flex items-start gap-3 font-body-md text-on-surface-variant/90">
                <span className="w-2 h-2 bg-blood-red shrink-0 mt-1.5 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <div className="font-label-sm text-label-sm text-on-surface-variant/90 uppercase mb-3">TECH_STACK</div>
          <div className="flex flex-wrap gap-2">
            {entry.stack.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-void-black border border-surface-border text-label-sm text-primary font-label-sm">{tech}</span>
            ))}
          </div>
        </div>

        {entry.metrics && entry.metrics.length > 0 && (
          <div className="pt-5 border-t border-surface-border">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              {entry.metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="font-label-sm text-label-sm text-on-surface-variant/90 uppercase mb-2">{metric.label}</div>
                  <div className="font-headline-md text-[24px] text-stark-white">
                    {metric.value}
                    {metric.suffix && <span className="text-body-md text-on-surface-variant/80">{metric.suffix}</span>}
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
