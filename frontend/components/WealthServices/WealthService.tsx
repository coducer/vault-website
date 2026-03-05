/* eslint-disable @next/next/no-img-element */

'use client';
import { resolveStrapiMediaUrl } from '@/lib/strapi';
import { useRouter } from 'next/navigation';
import { Col, Row } from 'react-bootstrap';
import { GoArrowUpRight } from 'react-icons/go';
import BorderButton from '../Buttons/BorderButton';

type SectionItem = string | number | null | undefined;

const WealthService = ({
  wealthServicesTitle,
  wealthServicesButtonName,
  wealthServicesButtonLink,
  sections,
  sectionsImage,
}: {
  wealthServicesTitle?: string;
  wealthServicesButtonName?: string;
  wealthServicesButtonLink?: string;
  sections?: {
    title?: string;
    icon?: { url: string; alternativeText?: string } | null;
    items?: SectionItem[];
  }[];
  sectionsImage?: { url: string; alternativeText?: string } | null;
}) => {
  const router = useRouter();

  // Helper to get a string for key prop when no title is present
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCardKey = (card: any, idx: number) => {
    if (card.title && typeof card.title === 'string') return card.title;
    if (card.icon && typeof card.icon.url === 'string') return card.icon.url + idx;
    return idx;
  };

  return (
    <div className="py-4 px-4 py-lg-5 position-relative d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          wealth services
        </div>
        <div className="font-libre fs-42 text-dark">{wealthServicesTitle}</div>
      </div>
      <div>
        <BorderButton
          text={wealthServicesButtonName ?? ''}
          style={{ color: '#000' }}
          sufixIconChildren={<GoArrowUpRight size={20} />}
          borderColorWhite={false}
          onClick={() => router.push(wealthServicesButtonLink ?? '')}
        />
      </div>
      <Row className="g-4 pt-1">
        {sections?.map((card, cardIndex) => (
          <Col
            key={getCardKey(card, cardIndex)}
            md={4}
            sm={6}
            xs={12}
            className="d-flex"
            style={{ minHeight: 400 }}
          >
            <div
              className="wealth-service-card h-100 d-flex flex-column justify-content-between p-4 bg-white position-relative w-100 bg-secondary "
              style={{ borderRadius: 4 }}
            >
              <div className="d-flex flex-column gap-3 mb-3">
                {card.icon?.url && (
                  <img
                    src={resolveStrapiMediaUrl(card.icon.url)}
                    alt={card.icon?.alternativeText || ''}
                    width={50}
                    height={50}
                    style={{ verticalAlign: 'middle' }}
                  />
                )}
                <span className="font-libre fs-20 text-dark">{card.title}</span>
              </div>
              <ul className="list-unstyled m-0 pt-1 fs-15">
                {(card?.items || []).map((p, i) => (
                  <li
                    key={typeof p === 'string' || typeof p === 'number' ? p : i}
                    className="py-2"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    {typeof p === 'object' && p !== null ? JSON.stringify(p) : p}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
        <Col
          md={4}
          sm={6}
          xs={12}
          className="d-flex"
          style={{ minHeight: 400, overflow: 'hidden' }}
        >
          <div
            className="wealth-service-card h-100 d-flex flex-column position-relative w-100 bg-secondary "
            style={{
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <img
              src={resolveStrapiMediaUrl(sectionsImage?.url)}
              alt={
                sectionsImage?.alternativeText ||
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

export default WealthService;
