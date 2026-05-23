export default function HeroTitle () {
  return (
    <h1
      className="font-display-lg-mobile lg:font-display-lg leading-none mb-6 uppercase tracking-tighter text-stark-white"
      style={{ fontSize: 'clamp(2.25rem, 10vw, 3.5rem)' }}
    >
      <span className="lg:hidden">
        HYBRID <span className="text-blood-red">INTELLIGENCE</span> &amp; CREATIVE PRODUCTION
      </span>
      <span className="hidden lg:inline">
        HYBRID INTELLIGENCE &amp;<br className="hidden lg:block" />
        <span className="text-primary font-extrabold">CREATIVE PRODUCTION</span>
      </span>
    </h1>
  );
}
