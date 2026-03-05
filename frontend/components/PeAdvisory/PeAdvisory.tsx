/* eslint-disable @next/next/no-img-element */
'use client';

import { PeAdvisorySectionItem, resolveStrapiMediaUrl } from '@/lib/strapi';
import { useRouter } from 'next/navigation';
import { Col, Row } from 'react-bootstrap';
import { GoArrowUpRight } from 'react-icons/go';
import BorderButton from '../Buttons/BorderButton';

const PeAdvisory = ({
  wealthServicesTitle,
  wealthServicesButtonName,
  wealthServicesButtonLink,
  sections,
  sectionsFirstImage,
  sectionsLastImage,
}: {
  wealthServicesTitle?: string;
  wealthServicesButtonName?: string;
  wealthServicesButtonLink?: string;
  sections?: PeAdvisorySectionItem[] | undefined;
  sectionsFirstImage?:
    | {
        url: string;
        alternativeText?: string | undefined;
      }
    | null
    | undefined;
  sectionsLastImage?:
    | {
        url: string;
        alternativeText?: string | undefined;
      }
    | null
    | undefined;
}) => {
  const router = useRouter();
  return (
    <div className="py-4 px-4 py-lg-5 position-relative d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          PE ADVISORY
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
              src={resolveStrapiMediaUrl(sectionsFirstImage?.url)}
              alt={sectionsFirstImage?.alternativeText}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                minHeight: 400,
              }}
            />
          </div>
        </Col>
        {sections?.map((card) => (
          <Col
            md={4}
            sm={6}
            xs={12}
            className="d-flex"
            style={{ minHeight: 400 }}
            key={card?.title}
          >
            <div
              className="wealth-service-card h-100 d-flex flex-column justify-content-between p-4 bg-white position-relative w-100 bg-secondary "
              style={{
                borderRadius: 4,
              }}
            >
              <div className="d-flex flex-column gap-3 mb-3">
                <img
                  src={resolveStrapiMediaUrl(card?.icon?.url)}
                  alt=""
                  width={50}
                  height={50}
                  style={{ verticalAlign: 'middle' }}
                />
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
              src={resolveStrapiMediaUrl(sectionsLastImage?.url)}
              alt={sectionsLastImage?.alternativeText}
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

export default PeAdvisory;
