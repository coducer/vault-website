/* eslint-disable @next/next/no-img-element */
'use client';

import { NewsItem, formatEventDate, resolveStrapiMediaUrl } from '@/lib/strapi';
import Link from 'next/link';
import { GoArrowDownRight } from 'react-icons/go';
import './VaultPerspective.css';

const LatestUpdates = ({ news, title }: { news: NewsItem[]; title: string }) => {
  console.info(news, 'newsnews');
  return (
    <div className={`py-4 py-lg-5 position-relative d-flex flex-column gap-4`}>
      <div className=" px-4 py-4 d-flex flex-column gap-4">
        <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-15">News</div>
        <div className={`font-libre fs-42 pb-4 text-dark`}>{title}</div>
      </div>
      <div className=" mb-5">
        {news && news.length > 0 ? (
          news.map((item) => (
            <Link
              key={`/news/${item.id}`}
              href={`/news/${item.id}`}
              className="d-block text-decoration-none what-we-do-content mb-3"
            >
              <div className="d-flex gap-3 what-we-do-text p-3">
                <div
                  className="position-relative overflow-hidden bg-secondary rounded"
                  style={{ height: 220, width: 400 }}
                >
                  <img
                    className="carousel-image"
                    src={resolveStrapiMediaUrl(item.bgImage?.url)}
                    alt={item.bgImage?.alternativeText || 'news-image'}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    width={400}
                    height={220}
                  />
                </div>
                <div className="flex-grow-1 d-flex flex-column gap-3 justify-content-between">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-uppercase fw-medium fs-13 letter-spacing">
                      {formatEventDate(item.date) || ''}
                    </div>
                    {/* <div className="text-uppercase fw-medium fs-13 letter-spacing">
                      {item.date
                        ? new Date(item.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : ''}
                    </div> */}
                  </div>
                  <div className="font-libre fs-24">{item.title}</div>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="text-uppercase fw-medium fs-13 letter-spacing">view more</div>
                    <div>
                      <GoArrowDownRight size={30} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-muted text-center py-4">No updates available.</div>
        )}
      </div>
    </div>
  );
};

export default LatestUpdates;
