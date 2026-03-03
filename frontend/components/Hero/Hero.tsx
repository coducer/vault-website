'use client';

import homeBg from '@/public/assests/home-img.jpg';
import vaultPin from '@/public/assests/home-vector.png';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { ImArrowDownRight2 } from 'react-icons/im';
import AnimatedFillButton from '../Buttons/AnimatedFillButton';
import BorderButton from '../Buttons/BorderButton';

const Hero = () => {
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinRef.current) return;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const movementStrength = 30; // lower = more luxury (subtle)

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      mouseX = x * movementStrength;
      mouseY = y * movementStrength;
    };

    const animate = () => {
      // Smooth inertia (luxury feel)
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      // Small floating motion
      const float = Math.sin(Date.now() * 0.0015) * 8;

      if (pinRef.current) {
        pinRef.current.style.transform = `
          translate3d(${currentX}px, ${currentY + float}px, 0)
        `;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="hero-wrapper position-relative" style={{ height: '100vh' }}>
      <div className="img-background">
        <Image src={homeBg} alt="homeBg" />
        <div className="img-overlay"></div>
      </div>
      {/* <div className="vault-marquee">
        <div className="vault-track">
          {Array(20).fill("#vault ").map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div> */}
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
        {/* <div className="vault-wave-wrapper">
          <div className="vault-wave-text">
            <h2 className=" text-capitalize">#Vault</h2>
            <h2 className=" text-capitalize">#Vault</h2>
          </div>
        </div> */}
        <div className=" text-white hero-text">
          Multi-family office <br />
          for responsible growth.
        </div>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <AnimatedFillButton
            text="DISCOVER OUR SERVICES"
            sufixIconChildren={<ImArrowDownRight2 color="var(--primary-blue)" size={18} />}
          />
          <BorderButton
            text="CONTACT US TODAY"
            sufixIconChildren={<GoArrowUpRight size={18} color="white" />}
          />
        </div>
      </div>
      <div className="vault-pin" ref={pinRef}>
        <Image src={vaultPin} alt="vaultPin" />
      </div>
      <div className="vault-wave-wrapper">
        <div className="vault-wave-text">
          <h2>Vault</h2>
          <h2>Vault</h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;
