/* eslint-disable @next/next/no-img-element */
import { CardList, resolveStrapiMediaUrl } from '@/lib/strapi';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import { GoArrowUpRight } from 'react-icons/go';

const CommenListCard = ({ details = [], pathname }: { details?: CardList[]; pathname: string }) => {
  return (
    <div className="px-4 py-5 my-4">
      <Row>
        {details.map((item) => (
          <Col md={6} key={item.id}>
            <div
              className="mb-5 carousel-card event-carousel-card position-relative d-flex flex-column overflow-hidden h-100 border-0"
              style={{
                transition: 'transform 0.2s',
              }}
            >
              <Link
                href={`/${pathname}/${item.id}`}
                className="carousel-image-link text-decoration-none"
                style={{ color: 'inherit' }}
                aria-label={`Read article: ${item.title}`}
              >
                <div
                  className="carousel-image-wrap w-100 position-relative overflow-hidden bg-secondary"
                  style={{ height: 450 }}
                >
                  <img
                    className="carousel-image"
                    src={resolveStrapiMediaUrl(item.bgImage?.url)}
                    alt={item.bgImage?.alternativeText}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <div className="read-article fw-light letter-spacing text-white fs-13 text-uppercase d-flex justify-content-center align-items-center gap-2 w-100 h-100">
                    READ ARTICLE{' '}
                    <span>
                      <GoArrowUpRight size={20} />
                    </span>
                  </div>
                </div>
              </Link>

              <div className="py-3">
                {item.date && <div className="fs-13 fw-medium primary-text">{item.date}</div>}
                <div className="fs-16 fw-medium text-dark">{item.title}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CommenListCard;
