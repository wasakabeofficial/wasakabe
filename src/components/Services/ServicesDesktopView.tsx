import { MdSecurity } from 'react-icons/md';
import type { ServiceDefinition } from './Services';
import ServiceCard from './ServiceCard';

interface ServicesDesktopViewProps {
  SECTION_TITLE: {
    breadcrumb: string;
    last: string;
  };
  services: ServiceDefinition[];
}

export default function ServicesDesktopView ({
  SECTION_TITLE,
  services
}: ServicesDesktopViewProps) {
  return (
    <div className="hidden lg:block relative z-10 min-h-screen bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-stark-white overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      <div className="scanline pointer-events-none" />

      <header className="relative pt-12 pb-12 px-margin-desktop mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blood-red/10 border-l-2 border-blood-red mb-8 w-fit">
          <MdSecurity className="text-label-md text-primary" />
          <span className="font-label-sm text-primary tracking-[0.2em] uppercase">{SECTION_TITLE.breadcrumb}</span>
        </div>

        <h1 className="font-display-lg display-title leading-none mb-6 uppercase italic tracking-tighter text-stark-white">
          {SECTION_TITLE.last}
        </h1>
      </header>

      <div className="pb-12 px-margin-desktop  mx-auto">
        <div className="grid grid-cols-3 gap-gutter">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
