/* eslint-disable @next/next/no-img-element */
'use client';

interface HeroProps {
  heroImageUrl: string;
  title: string;
}

const Hero = ({ heroImageUrl, title }: HeroProps) => {
  return (
    <section className="hero-wrapper position-relative" style={{ height: '100vh' }}>
      <div className="img-background">
        <img
          src={heroImageUrl}
          alt="About Us"
          className="object-cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          sizes="100vw"
        />
        <div className="img-overlay"></div>
      </div>
      <div className="vault-marquee">
        <div className="vault-track">
          {[...Array(20)].map((_, i) => (
            <span key={`first-${i}`}>#vault </span>
          ))}
          {[...Array(20)].map((_, i) => (
            <span key={`second-${i}`}>#vault </span>
          ))}
        </div>
      </div>

      <div className="hero-section h-100 d-flex justify-content-center gap-5 flex-column px-4">
        <div className=" text-white hero-text">{title}</div>
      </div>
    </section>
  );
};

export default Hero;
