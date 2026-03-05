/* eslint-disable @next/next/no-img-element */
import { OperatingPartnerItem, resolveStrapiMediaUrl } from '@/lib/strapi';
import React, { useCallback, useEffect, useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import RichTextBlock from '../RichTextBlock/RichTextBlock';

const closeBtnStyles: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const OperatingPartner: React.FC<{ partner: OperatingPartnerItem }> = ({ partner }) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (open || closing) {
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
  }, [open, closing]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setClosing(false);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 400);
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column gap-3 cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${partner.name}`}
        style={{ outline: 'none' }}
        onClick={handleOpen}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleOpen();
        }}
      >
        <div
          className="d-flex flex-column gap-3 justify-content-between position-relative overflow-hidden rounded"
          style={{
            minWidth: 220,
            height: 380,
            boxShadow: open ? '0px 6px 24px rgba(67,81,103,0.10)' : 'none',
            transition: 'box-shadow 0.25s',
          }}
        >
          <img
            src={resolveStrapiMediaUrl(partner?.image?.url)}
            alt={partner?.image?.alternativeText}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              filter: 'grayscale(1)',
              transition: 'filter 0.2s',
            }}
          />
          <span
            style={{
              position: 'absolute',
              right: 18,
              bottom: 12,
              background: 'rgba(20,20,20,0.76)',
              borderRadius: '50%',
              padding: 4,
              transition: 'background 0.2s',
            }}
          >
            <GoArrowUpRight size={24} color="#fff" />
          </span>
        </div>
        <div>
          <div className="primary-text fw-semibold fs-11 text-uppercase mb-1 letter-spacing">
            Operating Partner
          </div>
          <div className="fw-medium fs-15 mb-2">{partner.name}</div>
        </div>
      </div>
      {(open || closing) && (
        <>
          <div
            className="side-drawer-overlay"
            aria-label="Close partner detail overlay"
            onClick={handleClose}
          />
          <div
            className={`side-drawer ${closing ? 'close' : 'open'}`}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <div className="font-libre fs-22 text-dark">About Partner</div>
              <button
                aria-label="Close details"
                onClick={handleClose}
                tabIndex={0}
                style={closeBtnStyles}
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="mb-3 overflow-hidden rounded" style={{ width: 250, height: 250 }}>
              <img
                src={resolveStrapiMediaUrl(partner?.image?.url)}
                alt={partner.image?.alternativeText}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  filter: 'grayscale(1)',
                }}
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <div className="primary-text text-uppercase letter-spacing fw-semibold fs-12">
                Operating Partner
              </div>
              <div
                className="fw-bold font-libre text-dark fs-20 pb-2"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                {partner.name}
              </div>
              <div className="fs-14 text-dark mt-2">
                <RichTextBlock blocks={partner?.description} className="text-dark" />
              </div>
              <div
                className="d-flex flex-column gap-4 mt-3"
                style={{
                  marginLeft: 8,
                }}
              >
                <a
                  href={partner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center gap-2 text-dark text-decoration-none"
                  style={{
                    fontSize: 19,
                    fontFamily: 'Libre Baskerville, serif',
                    color: '#23262A',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#54595F',
                      borderRadius: 3,
                      width: 20,
                      height: 20,
                      marginRight: 6,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="16" height="16" rx="2" fill="#54595F" />
                      <path
                        d="M4.73 6.02h2.06V12H4.73V6.02zm1.04-2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM8.08 6.02h1.98v.82h.03c.28-.53.95-.93 1.77-.93C13.01 5.91 14 6.96 14 8.47V12h-2.06V8.9c0-.74-.27-1.26-.95-1.26-.52 0-.82.36-.95.71-.05.13-.06.32-.06.51V12H8.08V6.02z"
                        fill="#fff"
                      />
                    </svg>
                  </span>
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 20,
                      color: '#23262A',
                      fontFamily: 'Libre Baskerville, serif',
                    }}
                  >
                    LinkedIn
                  </span>
                </a>
                <a
                  href={`mailto:${partner.email}`}
                  className="d-flex align-items-center gap-2 text-dark text-decoration-none"
                  style={{
                    fontSize: 19,
                    fontFamily: 'Libre Baskerville, serif',
                    color: '#23262A',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      marginRight: 6,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="9.25"
                        stroke="#54595F"
                        strokeWidth="1.2"
                        fill="none"
                      />
                      <g>
                        <path
                          d="M6.5 8.197c0-.477.386-.863.863-.863h5.274c.477 0 .863.386.863.863v3.606c0 .477-.386.863-.863.863H7.363a.863.863 0 01-.863-.863V8.197zm.968-.63l2.552 2.046a.36.36 0 00.46 0l2.553-2.045a.364.364 0 01.063.203v3.294a.363.363 0 01-.363.363H7.363a.363.363 0 01-.363-.363V7.77a.362.362 0 01.068-.203z"
                          fill="#54595F"
                        />
                      </g>
                    </svg>
                  </span>
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 20,
                      color: '#23262A',
                      fontFamily: 'Libre Baskerville, serif',
                    }}
                  >
                    Email
                  </span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OperatingPartner;
