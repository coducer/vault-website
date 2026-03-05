/* eslint-disable @next/next/no-img-element */
'use client';

import { resolveStrapiMediaUrl } from '@/lib/strapi';

interface HeroProps {
  heroImageUrl:
    | {
        url: string;
        alternativeText?: string | undefined;
      }
    | null
    | undefined;
  title: string;
}

const CommenHero = ({ heroImageUrl, title }: HeroProps) => {
  return (
    <section className="hero-wrapper position-relative" style={{ height: '100vh' }}>
      <div className="img-background">
        <img
          src={resolveStrapiMediaUrl(heroImageUrl?.url)}
          alt={
            heroImageUrl?.alternativeText ||
            'Contemporary lounge chair in luxury office with city view'
          }
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

export default CommenHero;
