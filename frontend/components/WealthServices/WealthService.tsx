/* eslint-disable @next/next/no-img-element */

'use client';
import { PeAdvisorySectionItem, resolveStrapiMediaUrl } from '@/lib/strapi';
import { useRouter } from 'next/navigation';
import { Col, Row } from 'react-bootstrap';
import { GoArrowUpRight } from 'react-icons/go';
import BorderButton from '../Buttons/BorderButton';

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
  sections?: PeAdvisorySectionItem[];
  sectionsImage?: { url: string; alternativeText?: string } | null;
}) => {
  const router = useRouter();

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
        {sections?.map((card) => (
          <Col
            key={card?.title}
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
                {card?.items?.map((p) => (
                  <li
                    key={p?.text}
                    className="py-2"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    {p?.text}
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
