import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';

type OperatingPartnerInterface = {
  name: string;
  title: string;
  image: string;
  alt: string;
};

const closeBtnStyles: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const OperatingPartner: React.FC<{ partner: OperatingPartnerInterface }> = ({ partner }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const details = useMemo(() => ({
    bio: "Senior Partner with extensive experience in private equity and industrial transformations. Stefan Carlsson brings a wealth of expertise in strategic deal-making, operational value creation, and industry leadership.",
    details: [
      "25+ years in industrial and financial sectors",
      "Led deals totaling over $2B in assets",
      "Board member on several international companies",
    ],
    linkedIn: "#",
    email: "#"
  }), []);

  return (
    <>
      <div
        className='d-flex flex-column gap-3 cursor-pointer'
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${partner.name}`}
        style={{ outline: 'none' }}
        onClick={handleOpen}
        onKeyPress={e => {
          if (e.key === 'Enter' || e.key === ' ') handleOpen();
        }}
      >
        <div
          className="d-flex flex-column gap-3 justify-content-between position-relative overflow-hidden rounded"
          style={{
            minWidth: 220,
            height: 380,
            boxShadow: open ? '0px 6px 24px rgba(67,81,103,0.10)' : "none",
            transition: "box-shadow 0.25s",
          }}
        >
          <img
            src={
              partner.image
                ? partner.image
                : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=3'
            }
            alt={partner.alt || partner.name}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              filter: "grayscale(1)",
              transition: "filter 0.2s",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: 18,
              bottom: 12,
              background: 'rgba(20,20,20,0.76)',
              borderRadius: '50%',
              padding: 4,
              transition: 'background 0.2s'
            }}
          >
            <GoArrowUpRight size={24} color="#fff" />
          </span>
        </div>
        <div>
          <div className="primary-text fw-semibold fs-11 text-uppercase mb-1 letter-spacing">
            {partner.title}
          </div>
          <div className="fw-medium fs-15 mb-2">{partner.name}</div>
        </div>
      </div>
      {open && (
        <>
          <div
            className="side-drawer-overlay"
            aria-label="Close partner detail overlay"
            onClick={handleClose}
          />
          <div
            className="side-drawer"
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
                src={
                  partner.image
                    ? partner.image
                    : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=3'
                }
                alt={partner.alt || partner.name}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  filter: "grayscale(1)",
                }}
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <div className="primary-text text-uppercase letter-spacing fw-semibold fs-12">
                {partner.title}
              </div>
              <div
                className="fw-bold font-libre text-dark fs-20 pb-2"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                {partner.name}
              </div>
              <div className="fs-14 text-dark mt-2">
                {details.bio}
              </div>
              <ul className="fs-13 text-dark mt-3 mb-0 ps-3">
                {details.details.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className=" text-capitalize fw-medium fs-13 pt-3">
                Read More
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OperatingPartner;
