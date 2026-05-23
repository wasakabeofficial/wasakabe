import { chica } from '../../assets';

export default function HeroImageLayer () {
  return (
    <div className="absolute inset-0 lg:relative lg:inset-auto lg:w-5xl lg:order-2 lg:h-full flex items-end justify-center pointer-events-none lg:pointer-events-auto overflow-hidden">
      <div className="hidden lg:block absolute inset-0 bg-blood-red/20 blur-[100px] rounded-full scale-75 transition-transform duration-1000 -z-10" />
      <div className="relative w-140 h-full overflow-hidden">
        <img
          alt="Wasaka Be Neural Operator"
          className="w-full h-full object-cover lg:object-contain object-top lg:object-bottom transition-transform duration-700 lg:hover:scale-[1.02]"
          style={{
            maskImage: 'linear-gradient(to top, transparent 5%, black 45%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 45%)',
          }}
          src={chica}
        />
      </div>
      <div className="absolute inset-0 crimson-gradient-overlay lg:hidden" />
      <div className="hidden lg:flex absolute top-1/4 right-4 flex-col gap-4 items-end animate-bounce" style={{ animationDuration: '5s' }}>
        <span className="bg-carbon-gray/80 border border-blood-red/40 px-3 py-1 font-label-sm text-[10px] text-primary backdrop-blur-md">BIO_ID: 99x-A</span>
        <span className="bg-carbon-gray/80 border border-blood-red/40 px-3 py-1 font-label-sm text-[10px] text-primary backdrop-blur-md">AUTH_LEVEL: OMEGA</span>
      </div>
    </div>
  );
}
