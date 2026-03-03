'use client';

import vaultIcon from '@/public/assests/vault-icon.png';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { GoArrowUpRight } from 'react-icons/go';
import type { WhatWeDoData, WhatWeDoItem } from '@/lib/strapi';
import BorderButton from '../Buttons/BorderButton';
import './WhatWeDo.css';

const CARD_DATA_FALLBACK: Array<{
  number: string;
  title: string;
  subtitle: string;
  focus: string;
  description: string;
  points: string[];
  link?: string;
}> = [
  {
    number: '01',
    title: 'Investments',
    subtitle: 'Investments Strategy',
    focus: 'Growth Focused',
    description:
      'Tailored investment strategies that focus on high-yield opportunities and risk mitigation.',
    points: [
      'Direct Investments',
      'Co-investment Opportunities',
      'Fund Selection',
      'Private Equity',
    ],
  },
  {
    number: '02',
    title: 'Wealth Services',
    subtitle: 'Wealth Services',
    focus: 'Growth Focused',
    description:
      "Vault's Wealth services support the structuring, protection and long-term oversight of private wealth.",
    points: ['Capital Allocation', 'Portfolio Rebalancing', 'Risk Assessment', 'Emerging Markets'],
  },
  {
    number: '03',
    title: 'Special Mandates',
    subtitle: 'Special Mandates',
    focus: 'Tailored Solutions',
    description:
      'Bespoke mandates for unique client requirements, providing specialized financial advisory and asset management.',
    points: ['Advisory Services', 'M&A Support', 'Sector Research', 'Deal Origination'],
  },
];

function buildCardsFromData(data: WhatWeDoData | null): typeof CARD_DATA_FALLBACK {
  if (!data?.items?.length) return CARD_DATA_FALLBACK;
  return data.items.map((item: WhatWeDoItem, idx: number) => ({
    number: String(idx + 1).padStart(2, '0'),
    title: item.title ?? '',
    subtitle: item.item_title ?? '',
    focus: item.item_title ?? '',
    description: item.description ?? '',
    points: (item.points ?? []).map((p) => p.text ?? '').filter(Boolean),
    link: item.link,
  }));
}

const WhatWeDo = ({ data }: { data?: WhatWeDoData | null }) => {
  const cards = buildCardsFromData(data ?? null);
  const header = data?.header ?? 'A structured approach to private capital';

  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const prevIndexRef = useRef<number>(0);

  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      const timeout = setTimeout(() => {
        setAnimate(false);
        requestAnimationFrame(() => setAnimate(true));
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [activeIndex]);

  const activeCard = cards[activeIndex];

  return (
    <div className="pt-4 pt-lg-5 position-relative d-flex flex-column gap-4 what-we-do">
      <div className="px-4 d-flex flex-column gap-4 py-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          what we do
        </div>
        <div className="font-libre fs-42 pb-4 text-dark">{header}</div>
      </div>
      <Row className="g-0">
        <Col lg={3}>
          <div className="what-we-do-card pt-5 d-flex flex-column gap-2">
            {cards.map((item, idx) => (
              <div
                key={item.title || idx}
                className={
                  `what-we-do-card-text d-flex gap-3 align-items-center text-white font-libre fs-18 ` +
                  (activeIndex === idx ? 'active ' : '')
                }
                onClick={() => {
                  prevIndexRef.current = activeIndex;
                  setActiveIndex(idx);
                }}
              >
                <span>{item.number}</span>
                <span>{item.title}</span>
                <span className="flex-grow-1 d-flex justify-content-end">
                  <BsArrowRight size={24} />
                </span>
              </div>
            ))}
          </div>
        </Col>
        <Col lg={9}>
          <div className="px-5 d-flex py-5 h-100 bg-secondary">
            <div className={`d-flex flex-column gap-4 w-100 ${animate ? 'fade-slide-in' : ''}`}>
              <div className="text-dark fs-18 fw-semibold">{activeCard.subtitle}</div>
              <div className="text-justify text-dark">{activeCard.description}</div>
              {activeCard.points && activeCard.points.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    gap: '2.5rem',
                    flexWrap: 'wrap',
                    marginBottom: 20,
                  }}
                >
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {activeCard.points.slice(0, 2).map((text, i) => (
                      <li className="text-dark pb-2 d-flex align-items-center gap-2 fs-15" key={i}>
                        <Image src={vaultIcon} alt="" />
                        {text}
                      </li>
                    ))}
                  </ul>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {activeCard.points.slice(2, 4).map((text, i) => (
                      <li className="text-dark pb-2 d-flex align-items-center gap-2 fs-15" key={i}>
                        <Image src={vaultIcon} alt="" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                {activeCard.link ? (
                  <a
                    href={activeCard.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <BorderButton
                      text="EXPLORE"
                      style={{ color: '#000' }}
                      sufixIconChildren={<GoArrowUpRight size={20} />}
                      borderColorWhite={false}
                    />
                  </a>
                ) : (
                  <BorderButton
                    text="EXPLORE"
                    style={{ color: '#000' }}
                    sufixIconChildren={<GoArrowUpRight size={20} />}
                    borderColorWhite={false}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WhatWeDo;
