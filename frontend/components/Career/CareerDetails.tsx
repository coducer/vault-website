'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FiBookOpen, FiBriefcase, FiHome, FiMapPin, FiUser } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import BorderButton from '../Buttons/BorderButton';
import "./career.css";
import CareerApplyForm from './CareerApplyForm';

gsap.registerPlugin(ScrollTrigger);

const RIGHT_PANEL_SECTIONS = [
  { icon: <FiUser size={18} />, label: "Corporate Title", value: "Financial Analyst" },
  { icon: <FiHome size={18} />, label: "Contract", value: "Full-time" },
  { icon: <FiMapPin size={18} />, label: "Location", value: "Remote" },
  { icon: <FiBookOpen size={18} />, label: "Practice", value: "Finance" },
  { icon: <FiBriefcase size={18} />, label: "Business", value: "Investment & Advisory" },
];

const closeBtnStyles: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const CareerDetails = () => {
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
        <div className="font-libre fs-42 text-dark mt-5 pt-5 pb-2">
          Financial Analyst (Financial <br />Modelling Focus)
        </div>
        <div className="d-flex gap-2 align-items-center mb-4">
          <span><IoLocationOutline size={20} /></span>
          <span className="fs-13">Kyiv, Ukraine</span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="career-border-top career-details-layout px-4"
      >
        <div className="career-details-left flex-grow-1 pe-4">
          <div className=' pb-5'>
            <div className="mt-5 mb-4">
              <div className="fw-medium pb-2 fs-18">Who We Look For</div>
              <div className="fs-14 text-dark">
                We are looking for a Financial Analyst with strong financial modeling skills and a genuine interest in cross border investments to join our team. You will support our advisory and investment teams across multiple industries from valuation and market analysis to financial structuring and deal execution.
              </div>
            </div>
            <div className="mb-4">
              <div className=" fw-medium pb-2 fs-18">Responsibilities</div>
              <ul className="fs-14 text-dark ps-3" style={{ listStyle: 'disc' }}>
                <li>Develop and maintain financial models to support valuation, structuring, and investment decisions.</li>
                <li>Conduct detailed financial market and sector analyses to support deal execution and due diligence.</li>
                <li>Support internal reporting, financial projections, and scenario modeling for strategic initiatives.</li>
                <li>Assist in preparing pitch materials, investment memoranda and client presentations.</li>
                <li>Collaborate with stakeholders and partners on ongoing deals and portfolio projects.</li>
              </ul>
            </div>
            <div className="mb-4">
              <div className=" fw-medium pb-2 fs-18">Qualifications</div>
              <ul className="fs-14 text-dark ps-3" style={{ listStyle: 'disc' }}>
                <li>1-2 years of relevant experience in finance, investment, consulting, or a related analytical role.</li>
                <li>Solid understanding of financial markets and structuring.</li>
                <li>Strong proficiency in Excel/Google Sheets; experience with PowerPoint and financial databases is a plus.</li>
                <li>Bachelor’s degree in finance, economics, or related field; related postgraduate or certification (CFA or similar) is an advantage.</li>
                <li>Fluency in English; additional languages (French, German etc.) are a plus.</li>
                <li>Analytical, detail-oriented, and collaborative.</li>
                <li>Self-motivated and able to operate effectively within international teams.</li>
                <li>Ability to prioritize and complete tasks efficiently in a fast-paced environment.</li>
              </ul>
            </div>
            <div className="mb-0">
              <div className=" fw-medium pb-2 fs-18">What We Offer</div>
              <ul className="fs-14 text-dark ps-3" style={{ listStyle: 'disc' }}>
                <li>Competitive compensation</li>
                <li>Direct exposure to high-impact deals, fundraising processes and investment structuring</li>
                <li>Mentorship by experienced professionals</li>
                <li>Engagement across countries and jurisdictions, including Europe, the Middle East and beyond</li>
                <li>Opportunities for learning, personal development, and growth within the Vault network</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          ref={rightRef}
          className="career-details-right career-sticky  px-4 w-100 w-lg-375 "
        >
          <div className='career-details-right-border'>
            <div className=" fs-16 font-libre mb-4 mt-5">Opportunity Overview</div>
            <ul className="list-unstyled mb-4">
              {RIGHT_PANEL_SECTIONS.map((s, i) => (
                <li key={i} className="d-flex gap-3 align-items-center py-2">
                  <span className=' primary-text'>{s.icon}</span>
                  <div>
                    <div className="fs-12 text-muted">{s.label}</div>
                    <div className="fw-medium fs-14 letter-spacing">{s.value}</div>
                  </div>
                </li>
              ))}
            </ul>
            <BorderButton
              text={"APPLY"}
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
            className={`side-drawer ${closing ? "close" : "open"}`}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <div className="font-libre fs-24 text-dark">Financial Analyst</div>
              <button
                aria-label="Close"
                onClick={handleClose}
                tabIndex={0}
                style={closeBtnStyles}
              >
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