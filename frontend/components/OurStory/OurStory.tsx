/* eslint-disable @next/next/no-img-element */
'use client';

import type { OurStoryData, OurStoryItem } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';
import { Col, Row } from 'react-bootstrap';
import './OurStory.css';

const DEFAULT_BG =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';

const OurStory = ({ data }: { data?: OurStoryData | null }) => {
  const header = data?.header ?? '';
  const items: OurStoryItem[] = Array.isArray(data?.items) ? (data!.items as OurStoryItem[]) : [];

  return (
    <div className=" pt-4  pt-lg-5 position-relative d-flex flex-column gap-4 our-story ">
      <div className=" px-4 py-4 d-flex flex-column gap-4">
        <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-15">
          Our Story
        </div>
        <div className="font-libre fs-42 pb-4 text-dark">{header}</div>
      </div>
      <div>
        <Row className="g-0">
          {items?.map((item, idx) => {
            const bgUrl = item.image?.url ? getStrapiMediaUrl(item.image.url) : DEFAULT_BG;
            return (
              <Col md={4} key={item.title ?? idx}>
                <div className="p-3 our-story-card d-flex flex-column justify-content-between gap-4 position-relative">
                  {item.image?.url ? (
                    <div className="img-background-our-story">
                      <img src={bgUrl} alt={item.image?.alternativeText ?? item.title ?? ''} />
                    </div>
                  ) : (
                    <div
                      className="img-background-our-story"
                      style={{ backgroundColor: '#0F172A', minHeight: 200 }}
                    />
                  )}
                  <div className="font-libre fs-24 pb-4 text-white our-story-section ">
                    {item.title}
                  </div>
                  <div className="d-flex flex-column gap-3 mb-4">
                    {(item.details ?? []).map((d, i) => (
                      <div
                        className={
                          i < (item.details?.length ?? 0) - 1
                            ? 'text-secondary fs-15 border-bottom pb-2'
                            : 'text-secondary fs-15 pb-2'
                        }
                        key={i}
                      >
                        {d.text}
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default OurStory;
