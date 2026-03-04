'use client'
import React, { useEffect, useRef, useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import FadeTransition from '../FadeTransition';
import NestedTabs from '../NestedTabs';
import OperatingPartner from './OperatingPartner';

const TEAM_MEMBERS = [
  {
    name: "Alvise Narduzzi",
    title: "Co-Founder & CEO",
    description: (
      <>
        <p>
          Vault People features Alvise's experience in media and corporate law and his vertical sector focus with a multidisciplinary track record in tech, oil and gas, telecom, consumer and banking, real estate investing, and business transformation.
        </p>
        <p>
          Trained as a legal advisor for private and public law, he subsequently obtained a Master of Public Policy at London School of Economics (LSE), specializing in strategic risk & governance.
        </p>
        <p>
          Leveraging his diverse background, provides a balanced and critical, at times highly technical and critical, multi-level industry risk & opportunity analysis for our experts in investment and business transformation consulting.
        </p>
        <div className="d-flex gap-3 align-items-center mt-2">
          <a href="#" style={{ fontSize: 14, color: "#000", textDecoration: 'none' }}>🔗 LinkedIn</a>
          <a href="#" style={{ fontSize: 14, color: "#000", textDecoration: 'none' }}>✉ Email</a>
        </div>
      </>
    ),
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=3",
    alt: "Alvise Narduzzi photo"
  }
];

const OPERATING_PARTNERS = [
  {
    name: "Stefan Carlsson",
    title: "Partner",
    image: "",
    alt: "Stefan Carlsson Photo"
  },
  {
    name: "Stefan Carlsson",
    title: "Partner",
    image: "",
    alt: "Stefan Carlsson Photo"
  },
  {
    name: "Stefan Carlsson",
    title: "Partner",
    image: "",
    alt: "Stefan Carlsson Photo"
  }
];

function AccordionItem({ open, onClick, member, children, last = false }: { open: boolean, onClick: () => void, member: any, children: React.ReactNode, last?: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number | undefined>(open ? undefined : 0);

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div
      className={` ${last ? '' : ' mb-3'}`}
      style={{ borderBottom: "1px solid var(--border)", transition: 'border-color 0.2s' }}
    >
      <button
        className="w-100 text-start py-3 bg-white border-0 d-flex align-items-center justify-content-between"
        aria-expanded={open}
        type="button"
        aria-controls={`panel-${member.name.replace(/\s+/g, '')}`}
        id={`btn-${member.name.replace(/\s+/g, '')}`}
        style={{
          outline: 'none',
          transition: 'color .2s',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <span className='fw-medium fs-16'>{member.name}</span>
        <span style={{
          transition: 'transform .25s cubic-bezier(.4,0,.2,1)',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)'
        }}><GoArrowUpRight size={24} /></span>
      </button>
      <div
        id={`panel-${member.name.replace(/\s+/g, '')}`}
        role="region"
        aria-labelledby={`btn-${member.name.replace(/\s+/g, '')}`}
        ref={contentRef}
        style={{
          maxHeight: open ? height : 0,
          willChange: "max-height",
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'max-height 0.45s cubic-bezier(.23,1,.32,1), opacity 0.28s',
        }}
      >
        <div className='py-3' style={{ transition: 'opacity 0.16s', opacity: open ? 1 : 0, borderTop: "1px solid var(--border)" }}>
          <div className="d-flex align-items-start gap-4 flex-wrap">
            <div style={{ flex: 1, minWidth: 200 }}>
              {children}
            </div>
            {member.image && (
              <div className=' rounded overflow-hidden' style={{ width: 250, height: 350 }}>
                <img
                  src={member.image}
                  alt={member.alt}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    filter: "grayscale(1)",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const TeamTabPanel: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <FadeTransition show={true}>
      {TEAM_MEMBERS.map((member, idx) => (
        <AccordionItem
          key={member.name}
          open={openIdx === idx}
          onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          member={member}
          last={idx === TEAM_MEMBERS.length - 1}
        >
          <div className=' d-flex flex-column gap-2 fs-15'>
            <div className='primary-text fw-semibold fs-14 font-libre'>{member.title}</div>
            {member.description}
          </div>
        </AccordionItem>
      ))}
    </FadeTransition>
  );
};

const PartnersTabPanel: React.FC = () => (
  <FadeTransition show={true}>
    <div className="row g-4 mt-3">
      {OPERATING_PARTNERS.map((partner, idx) => (
        <div className="col-12 col-sm-6 col-md-4" key={idx}>
          <OperatingPartner partner={partner} />
        </div>
      ))}
    </div>
  </FadeTransition>
);

const VaultPeople: React.FC = () => {
  return (
    <div className="px-4">
      <div className="font-libre fs-42 text-dark mt-5 pt-5 pb-2">Vault People</div>
      <NestedTabs
        tabs={[
          {
            label: 'TEAM',
            content: <TeamTabPanel />,
          },
          {
            label: 'OPERATING PARTNERS',
            content: <PartnersTabPanel />,
          },
        ]}
        tabClassName="justify-content-end mb-2 fs-14 fw-medium text-secondary"
        tabPanelClassName="mb-5 position-relative overflow-hidden"
      />
    </div>
  );
};

export default VaultPeople;