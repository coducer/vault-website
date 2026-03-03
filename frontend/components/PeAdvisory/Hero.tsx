'use client';

import homeBg from '@/public/assests/PE-Advisory.png';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="hero-wrapper position-relative" style={{ height: '100vh' }}>
      <div className="img-background">
        <Image src={homeBg} alt="homeBg" />
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
        <div className=" text-white hero-text">PE Advisory

        </div>
      </div>
    </section>
  );
};

export default Hero;
