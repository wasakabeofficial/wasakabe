import type { ExperienceEntry, SectionTitle } from './Experience';
import ExperienceDetailDesktop from './ExperienceDetailDesktop';

interface ExperienceDesktopViewProps {
  SECTION_TITLE: SectionTitle;
  entries: ExperienceEntry[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ExperienceDesktopView ({
  SECTION_TITLE,
  entries,
  selectedId,
  onSelect,
}: ExperienceDesktopViewProps) {
  const selectedEntry = entries.find((e) => e.id === selectedId) ?? entries[0];

  return (
    <div className="hidden lg:block relative min-h-screen bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-stark-white overflow-hidden grid-bg">
      <div className="scanline pointer-events-none" />

      <div className="pt-32 pb-20 px-margin-desktop max-w-max-width mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-blood-red animate-pulse" />
            <span className="font-label-sm text-label-sm text-blood-red uppercase tracking-widest">
              {SECTION_TITLE.breadcrumb}
            </span>
          </div>
          <h1 className="font-display-lg display-title leading-none uppercase tracking-tighter text-stark-white">
            {SECTION_TITLE.title}
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-gutter">
          {/* Left: Terminal-style entry list */}
          <div className="w-80 shrink-0">
            <div className="font-label-sm text-label-sm text-on-surface-variant/80 uppercase tracking-widest mb-1 px-4">
              // TERMINAL_LOG
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant/50 mb-5 px-4">
              $ select entry to inspect ——
            </div>
            <div className="space-y-1">
              {entries.map((entry) => {
                const isSelected = entry.id === selectedId;
                return (
                  <button
                    key={entry.id}
                    onClick={() => onSelect(entry.id)}
                    className={`w-full text-left px-4 py-4 border-l-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blood-red bg-blood-red/10 text-stark-white'
                        : 'border-transparent text-on-surface-variant hover:border-blood-red/40 hover:bg-surface-container-low hover:text-stark-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isSelected && <span className="text-blood-red font-bold text-body-md">{'>'}</span>}
                      <span className={`font-label-md text-body-md uppercase font-bold ${isSelected ? 'text-stark-white' : ''}`}>
                        {entry.company}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 bg-blood-red rounded-full animate-pulse ml-auto" />
                      )}
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant/80 mt-1 pl-6">
                      {entry.logId} // {entry.tenure}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer legend */}
            <div className="mt-8 px-4 font-label-sm text-label-sm text-on-surface-variant/50 leading-relaxed">
              <span className="text-blood-red/70">$</span> ls -la experience/ <span className="text-on-surface-variant/40">| 4 entries</span>
            </div>
          </div>

          {/* Right: Detail panel */}
          <div className="flex-1 min-w-0">
            <ExperienceDetailDesktop entry={selectedEntry} />
          </div>
        </div>
      </div>
    </div>
  );
}
