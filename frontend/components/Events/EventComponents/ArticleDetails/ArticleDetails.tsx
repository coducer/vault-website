/* eslint-disable @next/next/no-img-element */
'use client';

import type { EventDetailBlock, EventItem } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';
import meetingImg from '@/public/assests/event.jpg';
import { Col, Row } from 'react-bootstrap';
import './ArticleDetails.css';

function formatEventDate(date?: string) {
  if (!date || isNaN(Date.parse(date))) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function resolveStrapiMediaUrl(url?: string) {
  if (!url) return '';
  return getStrapiMediaUrl(url);
}

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
                      src={
                        detail.image?.url ? resolveStrapiMediaUrl(detail.image.url) : meetingImg.src
                      }
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
                className="p-3 border d-flex justify-content-center align-items-center bg-white"
                style={{ height: '230px' }}
              >
                <img
                  src={resolveStrapiMediaUrl(logo.url)}
                  alt={logo.alternativeText ?? `Participant ${idx + 1}`}
                  style={{
                    maxHeight: '90px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    width: 'auto',
                  }}
                  // Use loading="lazy" for non-critical images
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div>
        <div className="pt-4 d-flex flex-column gap-4">
          <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
            Partners
          </div>
          <div className="font-libre fs-42 pb-4 text-dark">Collaborating with Leading Partners</div>
        </div>
        <Row className="g-3 mb-4 mt-3">
          {event?.partners?.map((logo, idx) => (
            <Col md={3} xs={12} key={idx}>
              <div
                className="p-3 border d-flex justify-content-center align-items-center bg-white"
                style={{ height: '230px' }}
              >
                <img
                  src={resolveStrapiMediaUrl(logo.url)}
                  alt={logo.alternativeText ?? `Partner ${idx + 1}`}
                  style={{
                    maxHeight: '90px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    width: 'auto',
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ArticleDetails;
