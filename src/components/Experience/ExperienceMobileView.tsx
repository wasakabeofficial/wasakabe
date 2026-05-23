import { MdChevronRight } from 'react-icons/md';
import type { ExperienceEntry } from './Experience';
import ExperienceDetailMobile from './ExperienceDetailMobile';

interface ExperienceMobileViewProps {
  SECTION_TITLE: {
    breadcrumb: string;
    title: string;
  };
  entries: ExperienceEntry[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ExperienceMobileView ({
  SECTION_TITLE,
  entries,
  selectedId,
  onSelect,
}: ExperienceMobileViewProps) {
  return (
    <div className="lg:hidden relative min-h-screen bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-stark-white overflow-hidden grid-bg">
      <div className="scanline pointer-events-none" />

      <div className="pt-28 pb-20 px-margin-mobile">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-blood-red animate-pulse" />
            <span className="font-label-sm text-label-sm text-blood-red uppercase tracking-widest">
              {SECTION_TITLE.breadcrumb}
            </span>
          </div>
          <h1 className="font-display-lg-mobile display-title leading-none uppercase tracking-tighter text-stark-white">
            {SECTION_TITLE.title}
          </h1>
        </div>

        {/* Accordion List */}
        <div className="font-label-sm text-label-sm text-on-surface-variant/50 mb-4 px-1">
          $ tap an entry to expand ——
        </div>
        <div className="space-y-3">
          {entries.map((entry) => {
            const isOpen = selectedId === entry.id;
            return (
              <div key={entry.id} className={`bg-charcoal border overflow-hidden transition-colors ${
                isOpen ? 'border-blood-red/60' : 'border-surface-border'
              }`}>
                {/* Clickable header */}
                <button
                  onClick={() => onSelect(entry.id)}
                  className={`w-full flex items-center justify-between px-5 py-5 text-left transition-colors ${
                    isOpen ? 'bg-blood-red/10' : 'hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${isOpen ? 'bg-blood-red shadow-[0_0_8px_rgba(139,0,0,0.6)]' : 'bg-surface-border'}`} />
                    <div className="min-w-0">
                      <div className="font-label-md text-body-md text-stark-white uppercase font-bold truncate">{entry.company}</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant/80 truncate mt-0.5">{entry.logId} // {entry.tenure}</div>
                    </div>
                  </div>
                  <MdChevronRight
                    className={`text-[20px] text-blood-red shrink-0 transition-transform ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {/* Expandable detail */}
                {isOpen && <ExperienceDetailMobile entry={entry} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
 