/* eslint-disable @next/next/no-img-element */
'use client';

import { PeAdvisorySectionItem, resolveStrapiMediaUrl } from '@/lib/strapi';
import { useRouter } from 'next/navigation';
import { Col, Row } from 'react-bootstrap';
import { GoArrowUpRight } from 'react-icons/go';
import BorderButton from '../Buttons/BorderButton';

// Unified SectionCard used by both Wealth and PE Advisory
const SectionCard = ({
  icon,
  title,
  items,
}: {
  icon?:
    | {
        url: string;
        alternativeText?: string | undefined;
      }
    | null
    | undefined;
  title: string | undefined;
  items: { text?: string }[];
}) => (
  <div
    className="wealth-service-card h-100 d-flex flex-column justify-content-between p-4 bg-white position-relative w-100 bg-secondary "
    style={{ borderRadius: 4 }}
  >
    <div className="d-flex flex-column gap-3 mb-3">
      {icon?.url && (
        <img
          src={resolveStrapiMediaUrl(icon.url)}
          alt={icon?.alternativeText || ''}
          width={50}
          height={50}
          style={{ verticalAlign: 'middle' }}
        />
      )}
      <span className="font-libre fs-20 text-dark">{title}</span>
    </div>
    <ul className="list-unstyled m-0 pt-1 fs-15">
      {items?.map((p) => (
        <li key={p?.text} className="py-2" style={{ borderBottom: '1px solid var(--border)' }}>
          {p?.text}
        </li>
      ))}
    </ul>
  </div>
);

type MediaImage = { url: string; alternativeText?: string | undefined } | null | undefined;

export interface WealthAndPeAdvisorySectionProps {
  title: string;
  buttonName?: string;
  buttonLink?: string;
  parentTitle?: string;
  sections?: PeAdvisorySectionItem[];
  sectionsFirstImage?: MediaImage;
  sectionsLastImage?: MediaImage;
}

const WealthAndPeAdvisorySection = ({
  title,
  buttonName,
  buttonLink,
  parentTitle,
  sections,
  sectionsFirstImage,
  sectionsLastImage,
}: WealthAndPeAdvisorySectionProps) => {
  const router = useRouter();

  return (
    <div className="py-4 px-4 py-lg-5 position-relative d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          {parentTitle}
        </div>
        <div className="font-libre fs-42 text-dark">{title}</div>
      </div>
      <div>
        <BorderButton
          text={buttonName ?? ''}
          style={{ color: '#000' }}
          sufixIconChildren={<GoArrowUpRight size={20} />}
          borderColorWhite={false}
          onClick={() => router.push(buttonLink ?? '')}
        />
      </div>

      <Row className="g-4 pt-1">
        {sectionsFirstImage && (
          <Col md={4} sm={6} xs={12} className="d-flex" style={{ height: 400, overflow: 'hidden' }}>
            <div
              className="wealth-service-card h-100 d-flex flex-column position-relative w-100 bg-secondary "
              style={{ borderRadius: 4, overflow: 'hidden' }}
            >
              <img
                src={resolveStrapiMediaUrl(sectionsFirstImage?.url)}
                alt={
                  sectionsFirstImage?.alternativeText ||
                  'Contemporary lounge chair in luxury office with city view'
                }
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  minHeight: 400,
                }}
              />
            </div>
          </Col>
        )}
        {sections?.map((card) => (
          <Col key={card?.title} md={4} sm={6} xs={12} className="d-flex" style={{ height: 400 }}>
            <SectionCard icon={card.icon} title={card.title} items={card?.items || []} />
          </Col>
        ))}
        <Col md={4} sm={6} xs={12} className="d-flex" style={{ height: 400, overflow: 'hidden' }}>
          <div
            className="wealth-service-card h-100 d-flex flex-column position-relative w-100 bg-secondary "
            style={{ borderRadius: 4, overflow: 'hidden' }}
          >
            <img
              src={resolveStrapiMediaUrl(sectionsLastImage?.url)}
              alt={
                sectionsLastImage?.alternativeText ||
                'Contemporary lounge chair in luxury office with city view'
              }
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                minHeight: 400,
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WealthAndPeAdvisorySection;
