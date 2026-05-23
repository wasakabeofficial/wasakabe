import { MdSecurity } from 'react-icons/md';

export default function HeroBadge () {
  return (
    <>
  
      <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 bg-blood-red/10 border-l-2 border-blood-red mb-8 w-fit">
        <MdSecurity className="text-[14px] text-primary" />
        <span className="font-label-sm text-primary tracking-[0.2em]">CRIMSON PROTOCOL ACTIVE</span>
      </div>
    </>
  );
}
