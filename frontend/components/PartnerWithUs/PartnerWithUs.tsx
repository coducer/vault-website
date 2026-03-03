/* eslint-disable @next/next/no-img-element */
'use client';

import expand from '@/public/assests/expand.png';
import layers from '@/public/assests/layers.png';
import light from '@/public/assests/light-bulb.png';
import network from '@/public/assests/network.png';
import type { HomePartnerWithUsData, HomePartnerWithUsItem } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import AnimatedFillButton from '../Buttons/AnimatedFillButton';
import './PartnerWithUs.css';

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_ITEMS: Array<{ img: typeof network; title: string; subtitle: string }> = [
  { img: network, title: 'Network Effect', subtitle: 'Multiply network of investors and business with Vault.' },
  { img: light, title: 'Know How', subtitle: 'Exchange business or operational know-how with Vault.' },
  { img: layers, title: 'Industry Expertise', subtitle: 'Exchange deep industry insights with Vault.' },
  { img: expand, title: 'Expand Reach', subtitle: 'Expand your reach to deal flow.' },
];

function getItemsFromData(data: HomePartnerWithUsData | null): Array<{
  img: string | typeof network;
  title: string;
  subtitle: string;
}> {
  const items = Array.isArray(data?.items) ? (data!.items as HomePartnerWithUsItem[]) : [];
  if (items.length === 0) return FALLBACK_ITEMS;
  return items.map((item, i) => ({
    img: item.icon?.url
      ? getStrapiMediaUrl(item.icon.url)
      : FALLBACK_ITEMS[i % FALLBACK_ITEMS.length]?.img ?? network,
    title: item.title ?? '',
    subtitle: item.subtitle ?? '',
  }));
}

export default function PartnerWithUs({ data }: { data?: HomePartnerWithUsData | null }) {
  const leftRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [, setActiveIndex] = useState(0);
  const [failedImgIndices, setFailedImgIndices] = useState<Set<number>>(new Set());

  const title = data?.title ?? 'Become our\nOperating Partner';
  const buttonName = data?.buttonName ?? 'CONTACT US';
  const link = data?.link ?? '';
  const partnerData = getItemsFromData(data ?? null);

  useLayoutEffect(() => {
    if (!leftRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': function () {
          partnerData.forEach((_, i) => {
            ScrollTrigger.create({
              trigger: sectionsRef.current[i],
              start: 'top center',
              onEnter: () => setActiveIndex(i),
              onEnterBack: () => setActiveIndex(i),
            });
          });

          ScrollTrigger.create({
            trigger: leftRef.current,
            start: 'top top',
            end: () => {
              const right = document.querySelector('.partner-right');
              if (!right) return '+=0';
              const rightHeight = right.scrollHeight;
              const leftHeight = leftRef.current!.offsetHeight;
              return `+=${rightHeight - leftHeight}`;
            },
            pin: true,
            pinSpacing: true,
          });
        },
        '(max-width: 1023px)': function () {},
      });
    });

    return () => ctx.revert();
  }, [partnerData, partnerData.length]);

  const titleLines = title.split('\n');

  const buttonEl = (
    <AnimatedFillButton text={buttonName} sufixIconChildren={<GoArrowUpRight size={20} />} />
  );

  return (
    <div className="partner-with-us">
      <div className="partner-layout flex-wrap">
        <div className="partner-left">
          <div ref={leftRef} className="partner-left-inner px-4 gap-4">
            <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
              Partner With Us
            </div>
            <h2 className="font-libre fs-42 text-white">
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            {link ? <Link href={link}>{buttonEl}</Link> : buttonEl}
          </div>
        </div>
        <div className="partner-right">
          {partnerData.map((item, i) => {
            const isStrapiUrl = typeof item.img === 'string' && item.img.startsWith('http');
            const showStrapiImg = isStrapiUrl && !failedImgIndices.has(i);
            const fallbackSrc = FALLBACK_ITEMS[i % FALLBACK_ITEMS.length]?.img ?? network;
            const imageSrc = typeof item.img !== 'string' ? item.img : fallbackSrc;
            return (
            <div
              key={i}
              ref={(el) => {
                if (el) sectionsRef.current[i] = el;
              }}
              className="partner-with-us-content d-flex flex-column gap-3"
            >
              {showStrapiImg ? (
                <img
                  src={item.img as string}
                  alt={item.title}
                  onError={() => setFailedImgIndices((prev) => new Set(prev).add(i))}
                />
              ) : (
                <Image src={imageSrc} alt={item.title} />
              )}
              <div>
                <h3 className="font-libre fs-42 text-white">{item.title}</h3>
                <p className="text-secondary fs-15 fw-lighter mb-0">{item.subtitle}</p>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </div>
  );
}
