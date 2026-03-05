/* eslint-disable @next/next/no-img-element */
'use client';

import { CareerListItem, resolveStrapiMediaUrl } from '@/lib/strapi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import BorderButton from '../Buttons/BorderButton';
import CareerApplyForm from './CareerApplyForm';
import './career.css';
import RichTextBlock from '../RichTextBlock/RichTextBlock';

gsap.registerPlugin(ScrollTrigger);

const closeBtnStyles: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const CareerDetails = ({ career }: { career: CareerListItem | null }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useLayoutEffect(() => {
    const containerEl = containerRef.current;
    const rightEl = rightRef.current;
    if (!containerEl || !rightEl) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 992px)': function () {
          const leftEl = containerEl.querySelector('.career-details-left') as HTMLElement | null;
          if (!leftEl) return;

          ScrollTrigger.create({
            trigger: containerEl,
            start: 'top top+=110',
            end: () => {
              const leftHeight = leftEl.scrollHeight;
              const rightHeight = rightEl.offsetHeight;
              const diff = Math.max(0, leftHeight - rightHeight);
              return `+=${diff}`;
            },
            pin: rightEl,
            pinSpacing: true,
            invalidateOnRefresh: true,
          });
        },
      });
    }, containerEl);

    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
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
    <div className="career-details">
      <div className="px-4 mb-5">
        <div className="font-libre fs-42 text-dark mt-5 pt-5 pb-2">{career?.headerTitle}</div>
        <div className="d-flex gap-2 align-items-center mb-4">
          <span>
            <IoLocationOutline size={20} />
          </span>
          <span className="fs-13">{career?.location}</span>
        </div>
      </div>
      <div ref={containerRef} className="career-border-top career-details-layout px-4">
        <div className="career-details-left flex-grow-1 pe-4">
          <div className=" pb-5">
            <div className="mt-5 mb-4">
              <div className="fw-medium pb-2 fs-18">Who We Look For</div>
              <div className="fs-14 text-dark">
                <RichTextBlock blocks={career?.whoWeLookFor} className="text-dark" />
              </div>
            </div>
            <div className="mb-4">
              <div className=" fw-medium pb-2 fs-18">Responsibilities</div>
              <ul className="fs-14 text-dark ps-3" style={{ listStyle: 'disc' }}>
                {career?.responsibilities?.map((item, idx) => (
                  <li key={idx}>{item.responsibility}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <div className=" fw-medium pb-2 fs-18">Qualifications</div>
              <ul className="fs-14 text-dark ps-3" style={{ listStyle: 'disc' }}>
                {career?.qualifications?.map((item, idx) => (
                  <li key={idx}>{item.qualification}</li>
                ))}
              </ul>
            </div>
            <div className="mb-0">
              <div className=" fw-medium pb-2 fs-18">What We Offer</div>
              <ul className="fs-14 text-dark ps-3" style={{ listStyle: 'disc' }}>
                {career?.whatWeOffer?.map((item, idx) => (
                  <li key={idx}>{item.offer}</li>
                ))}
              </ul>
            </div>
            <div className="mt-5 mb-4">
              <div className="fw-medium pb-2 fs-18">About Vault Partners</div>
              <div className="fs-14 text-dark">
                <RichTextBlock blocks={career?.aboutVaultPartners} className="text-dark" />
              </div>
            </div>
          </div>
        </div>
        <div ref={rightRef} className="career-details-right career-sticky  px-4 w-100 w-lg-375 ">
          <div className="career-details-right-border">
            <div className=" fs-16 font-libre mb-4 mt-5">Opportunity Overview</div>
            <ul className="list-unstyled mb-4">
              {career?.opportunityOverview?.map((s, i) => (
                <li key={i} className="d-flex gap-3 align-items-center py-2">
                  <span className="primary-text d-flex align-items-center">
                    <img
                      src={resolveStrapiMediaUrl(s?.icon?.url)}
                      alt={s.icon?.alternativeText || 'icon'}
                      style={{
                        width: 28,
                        height: 28,
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </span>

                  <div>
                    <div className="fs-12 text-muted">{s.title}</div>
                    <div className="fw-medium fs-14 letter-spacing">{s.subTitle}</div>
                  </div>
                </li>
              ))}
            </ul>
            <BorderButton
              text={'APPLY'}
              style={{ color: '#000' }}
              sufixIconChildren={<GoArrowUpRight size={20} />}
              borderColorWhite={false}
              onClick={handleOpen}
            />
          </div>
        </div>
      </div>

      {/* Side drawer for application, similar to Portfolio/OperatingPartner */}
      {(open || closing) && (
        <>
          <div
            className="side-drawer-overlay"
            aria-label="Close application overlay"
            onClick={handleClose}
          />
          <div
            className={`side-drawer ${closing ? 'close' : 'open'}`}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <div className="font-libre fs-24 text-dark">Financial Analyst</div>
              <button aria-label="Close" onClick={handleClose} tabIndex={0} style={closeBtnStyles}>
                <IoMdClose size={24} />
              </button>
            </div>
            <div style={{ paddingRight: 8 }}>
              <CareerApplyForm />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CareerDetails;
