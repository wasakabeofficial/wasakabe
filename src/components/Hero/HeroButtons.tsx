import { MdLockOpen, MdTerminal, MdArrowForward } from 'react-icons/md';

export default function HeroButtons () {
  return (
    <>
      <div className="flex lg:hidden flex-col gap-4 w-full max-w-xs mx-auto mb-12">
        <button className="bg-blood-red text-stark-white font-label-md rounded-none border border-blood-red active:scale-95 transition-all duration-200 uppercase tracking-widest flex items-center justify-center gap-3 py-6">
          <MdLockOpen className="text-[20px]" />
          Authenticate Access
        </button>
        <button className="bg-transparent border border-surface-border text-on-surface font-label-md rounded-none hover:bg-surface-container-low active:scale-95 transition-all duration-200 uppercase tracking-widest flex items-center justify-center gap-3 py-6">
          <MdTerminal className="text-[20px]" />
          View Protocols
        </button>
      </div>
      <div className="hidden lg:flex flex-wrap gap-6 mb-16">
        <button className="group relative px-8 py-4 bg-blood-red text-stark-white font-label-md font-bold tracking-widest flex items-center gap-3 transition-all hover:bg-red-800 active:scale-95 crimson-glow">
          AUTHENTICATE ACCESS
          <MdArrowForward className="transition-transform group-hover:translate-x-1" />
        </button>
        <button className="px-8 py-4 border border-surface-border bg-carbon-gray text-on-surface font-label-md font-bold tracking-widest hover:border-primary transition-all active:scale-95">
          VIEW PROTOCOLS
        </button>
      </div>
    </>
  );
}
