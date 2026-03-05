/* eslint-disable @next/next/no-img-element */
'use client';

import type { EventDetailBlock, EventItem } from '@/lib/strapi';
import { formatEventDate, resolveStrapiMediaUrl } from '@/lib/strapi';
import { Col, Row } from 'react-bootstrap';
import './ArticleDetails.css';

const ArticleDetails = ({ event }: { event?: EventItem | null }) => {
  const eventDate = event?.date && formatEventDate(event.date) ? formatEventDate(event.date) : '';
  const eventTitle = event?.title ?? '';
  return (
    <section className="px-4 py-4">
      {(event?.detailsImage?.length ?? 0) > 0 &&
        event?.detailsImage?.map((detail: EventDetailBlock, idx: number) => {
          const isOdd = idx % 2 === 0;
          return (
            <div className="article-details-section pb-5 mb-5" key={idx}>
              <Row
                className={`align-items-start g-4 flex-column ${isOdd ? 'flex-md-row' : 'flex-md-row-reverse'}`}
              >
                <Col md={8}>
                  <div className="d-flex flex-column gap-3">
                    <div className="font-libre fs-26 text-dark fw-semibold">On {eventDate},</div>
                    <div className="fs-15">{eventTitle}</div>
                    <div className="fs-15">{detail.description}</div>
                  </div>
                </Col>
                <Col
                  md={4}
                  className={`d-flex ${isOdd ? 'justify-content-md-end' : 'justify-content-md-start'} justify-content-center`}
                >
                  <div style={{ maxWidth: 400, height: 440, width: '100%' }}>
                    <img
                      src={resolveStrapiMediaUrl(detail?.image?.url)}
                      alt={detail.image?.alternativeText || 'Event detail'}
                      className="rounded shadow-sm w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}

      {(event?.participants?.length ?? 0) > 0 && (
        <div>
          <div className="pt-4 d-flex flex-column gap-4">
            <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
              Participants
            </div>
          </div>
          <Row className="g-3 mb-4 mt-3">
            {event?.participants?.map((logo, idx) => (
              <Col md={3} xs={12} key={idx}>
                <div
                  className=" border d-flex justify-content-center align-items-center bg-white"
                  style={{ height: '230px', overflow: 'hidden' }}
                >
                  <img
                    src={resolveStrapiMediaUrl(logo.url)}
                    alt={logo.alternativeText ?? `Participant ${idx + 1}`}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
      {(event?.partners?.length ?? 0) > 0 && (
        <div>
          <div className="pt-4 d-flex flex-column gap-4">
            <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
              Partners
            </div>
            <div className="font-libre fs-42 pb-4 text-dark">
              Collaborating with Leading Partners
            </div>
          </div>
          <Row className="g-3 mb-4 mt-3">
            {event?.partners?.map((logo, idx) => (
              <Col md={3} xs={12} key={idx}>
                <div
                  className=" border d-flex justify-content-center align-items-center bg-white"
                  style={{ height: '230px', overflow: 'hidden' }}
                >
                  <img
                    src={resolveStrapiMediaUrl(logo.url)}
                    alt={logo.alternativeText ?? `Partner ${idx + 1}`}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </section>
  );
};

export default ArticleDetails;
