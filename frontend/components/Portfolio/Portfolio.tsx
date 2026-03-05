/* eslint-disable @next/next/no-img-element */
'use client';

import { PortfolioItem, resolveStrapiMediaUrl } from '@/lib/strapi';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IoMdClose } from 'react-icons/io';

const closeBtnStyles: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const Portfolio: React.FC<{ items: PortfolioItem[] }> = ({ items }) => {
  const [openIdx, setOpenIdx] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (openIdx !== null || closing) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.left = '';
        window.scrollTo(0, scrollY);
      };
    }
    // Clean up any lingering styles
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.left = '';
  }, [openIdx, closing]);

  const handleCardClick = useCallback((idx: string) => {
    setOpenIdx(idx);
    setClosing(false);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setOpenIdx(null);
      setClosing(false);
    }, 400);
  }, []);

  const selected = useMemo(
    () => (openIdx !== null ? items.find((i) => i.id === openIdx) : null),
    [openIdx, items]
  );

  return (
    <div className="px-4">
      <div className="font-libre fs-42 text-dark mt-5 pt-5 pb-2">Our Portfolio</div>
      <div className="d-flex gap-4 my-3 " role="tablist" aria-label="Portfolio Filters" style={{ fontSize: 17 }}>
        {([
          { key: 'all', label: 'All Projects', count: 14 },
          { key: 'incubation', label: 'Incubation And Spin-Off', count: 5 },
          { key: 'investment', label: 'Investment', count: 4 },
          { key: 'advisory', label: 'Advisory', count: 5 },
        ] as const).map((tab, idx) => {
          const isActive = idx === 0;
          return (
            <button
              key={tab.key}
              className="bg-transparent border-0 p-0 fw-medium fs-15"
              style={{
                outline: 'none',
                color: isActive ? '#222' : '#8c8c8c',
                borderBottom: isActive ? '2px solid #222' : 'none',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: 0.2,
                cursor: isActive ? 'default' : 'pointer',
                background: 'none',
                transition: 'color .16s, border-bottom .16s'
              }}
              tabIndex={isActive ? 0 : -1}
              aria-current={isActive ? 'page' : undefined}
              role="tab"
              aria-selected={isActive}
              disabled={isActive}
            >
              {tab.label}
              <sup className=' fs-12 ms-1 text-muted fw-medium'>{tab.count}</sup>
            </button>
          );
        })}
      </div>
      <Row className="my-4">
        {items.map((item) => (
          <Col md={4} key={item.id || item.title} className="mb-4 d-flex flex-column gap-2">
            <div
              tabIndex={0}
              role="button"
              aria-label={`About company: ${item.title}`}
              className="d-flex flex-column gap-2 cursor-pointer"
              style={{ outline: 'none' }}
              onClick={() => handleCardClick(item.id)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick(item.id);
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center bg-secondary mb-2 carousel-image-wrap position-relative"
                style={{ minHeight: 300, overflow: 'hidden', height: 300 }}
              >
                <img
                  src={resolveStrapiMediaUrl(item.bgImage?.url)}
                  alt={item.bgImage?.alternativeText || item.title}
                  className="carousel-image"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <div className="primary-text text-uppercase letter-spacing fw-semibold fs-13">
                {item.category}
              </div>
              <div className="text-dark fw-medium fs-18">{item.title}</div>
            </div>
          </Col>
        ))}
      </Row>
      {(openIdx !== null || closing) && selected && (
        <>
          <div
            className="side-drawer-overlay"
            aria-label="Close details overlay"
            onClick={handleClose}
          />
          <div
            className={`side-drawer ${closing ? "close" : "open"}`}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <div className="font-libre fs-24 text-dark ">About Company</div>
              <button aria-label="Close" onClick={handleClose} tabIndex={0} style={closeBtnStyles}>
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="mb-3" style={{ width: 300, maxWidth: '100%' }}>
              {selected.bgImage?.url && (
                <img
                  src={resolveStrapiMediaUrl(selected.bgImage.url)}
                  alt={selected.bgImage.alternativeText || selected.display_title || selected.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: 4,
                  }}
                  width={300}
                  height={180}
                />
              )}
            </div>
            <div className="d-flex flex-column gap-3">
              <div className="primary-text text-uppercase letter-spacing fw-semibold fs-13">
                {selected.category}
              </div>
              <div
                className="fw-bold font-libre text-dark fs-20 pb-3"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                {selected.display_title || selected.title}
              </div>
              <div className="fs-15 text-dark">
                {typeof selected.description === 'string' ? selected.description : null}
              </div>
              {selected.company_url && (
                <div className="fs-15 text-dark d-flex gap-2">
                  <span>Learn more:</span>
                  <a
                    href={selected.company_url}
                    className="primary-text"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selected.company_url}
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;
