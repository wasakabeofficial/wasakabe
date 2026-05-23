import type { ServiceDefinition } from './Services';
import WaveformVisual from './WaveformVisual';

interface ServiceCardProps {
  service: ServiceDefinition;
  className?: string;
}

export default function ServiceCard ({ service, className = '' }: ServiceCardProps) {
  return (
    <div className={`group relative bg-carbon-gray border border-surface-border p-base flex flex-col transition-all duration-300 hover:border-blood-red overflow-hidden ${className}`}>
      <div className="absolute inset-0 card-scanline pointer-events-none opacity-20" />

      <div className="flex justify-between items-start mb-base border-b border-surface-border pb-base">
        <div>
          <span className="font-label-sm text-label-sm text-blood-red block mb-1">
            {service.sectorId}
          </span>
          <h2 className="font-headline-md text-headline-md uppercase font-bold tracking-tight">
            {service.title}
          </h2>
        </div>
        <span className="self-start pt-1">{service.icon}</span>
      </div>

      <div className="relative h-48 w-full bg-void-black mb-base border border-surface-border flex items-center justify-center overflow-hidden">
        {service.visualType === 'waveform' ? (
          <>
            <WaveformVisual />
            <img
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
              src={service.imageUrl}
            />
          </>
        ) : (
          <>
            <img
              alt={service.title}
              className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              src={service.imageUrl}
            />
            <div className="absolute bottom-2 left-2 bg-void-black/80 px-2 py-1 border border-blood-red/50">
              <span className="font-label-sm text-[10px] text-blood-red">
                DATA_FEED: NOMINAL
              </span>
            </div>
          </>
        )}
        {service.id === 'cinematic-production' && (
          <div className="absolute top-2 right-2 flex gap-1">
            <div className="w-3 h-3 border border-blood-red" />
            <div className="w-3 h-3 border border-blood-red bg-blood-red" />
          </div>
        )}
      </div>

      <p className="text-sm border-l-2 border-blood-red pl-3 italic text-stark-white mb-4">
        {service.description}
      </p>

      <ul className="font-label-sm text-label-sm space-y-2 uppercase grow">
        {service.capabilities.map((capability) => (
          <li key={capability.text} className="flex items-center gap-2">
            <span className="w-1 h-1 bg-blood-red shrink-0" />
            {capability.text}
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-4 border-t border-surface-border flex justify-between items-center font-label-sm text-[10px]">
        <span className="text-blood-red">{service.metadataLeft}</span>
        <span className="text-blood-red font-bold">{service.metadataRight}</span>
      </div>
    </div>
  );
}
