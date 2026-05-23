import { MdSecurity } from 'react-icons/md';
import type { ServiceDefinition } from './Services';
import ServiceCard from './ServiceCard';

interface ServicesMobileViewProps {
  SECTION_TITLE: {
    breadcrumb: string;
    last: string;
  };
  services: ServiceDefinition[];
}

export default function ServicesMobileView ({
  SECTION_TITLE,
  services}: ServicesMobileViewProps) {
  return (
    <div className="lg:hidden relative z-10 p-5 min-h-screen bg-void-black text-on-surface font-body-md selection:bg-blood-red selection:text-stark-white overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      <div className="scanline pointer-events-none" />

      <header className="relative pt-12 pb-8 px-margin-mobile">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blood-red/10 border-l-2 border-blood-red mb-8 w-3">
          <MdSecurity className="text-label-md text-primary" />
          <span className="font-label-sm text-primary tracking-widest uppercase">{SECTION_TITLE.breadcrumb}</span>
        </div>

        <h1 className="font-display-lg-mobile display-title leading-none mb-6 uppercase italic tracking-tighter text-stark-white">
          {SECTION_TITLE.last}
        </h1>
      </header>

      <div className="pb-12 px-margin-mobile">
        <div className="grid grid-cols-1 gap-gutter">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </div>
  );
}
