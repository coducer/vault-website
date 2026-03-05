/* eslint-disable @next/next/no-img-element */
'use client';
import { OperatingPartnerItem, TeamItem, resolveStrapiMediaUrl } from '@/lib/strapi';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import FadeTransition from '../FadeTransition';
import NestedTabs from '../NestedTabs';
import RichTextBlock from '../RichTextBlock/RichTextBlock';
import OperatingPartner from './OperatingPartner';

function AccordionItem({
  open,
  onClick,
  member,
  children,
  last = false,
}: {
  open: boolean;
  onClick: () => void;
  member: TeamItem;
  children: React.ReactNode;
  last?: boolean;
}) {
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
      style={{ borderBottom: '1px solid var(--border)', transition: 'border-color 0.2s' }}
    >
      <button
        className="w-100 text-start py-3 bg-white border-0 d-flex align-items-center justify-content-between"
        aria-expanded={open}
        type="button"
        aria-controls={`panel-${member?.name?.replace(/\s+/g, '')}`}
        id={`btn-${member?.name?.replace(/\s+/g, '')}`}
        style={{
          outline: 'none',
          transition: 'color .2s',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <span className="fw-medium fs-16">{member.name}</span>
        <span
          style={{
            transition: 'transform .25s cubic-bezier(.4,0,.2,1)',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          <GoArrowUpRight size={24} />
        </span>
      </button>
      <div
        id={`panel-${member?.name?.replace(/\s+/g, '')}`}
        role="region"
        aria-labelledby={`btn-${member?.name?.replace(/\s+/g, '')}`}
        ref={contentRef}
        style={{
          maxHeight: open ? height : 0,
          willChange: 'max-height',
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'max-height 0.45s cubic-bezier(.23,1,.32,1), opacity 0.28s',
        }}
      >
        <div
          className="py-3"
          style={{
            transition: 'opacity 0.16s',
            opacity: open ? 1 : 0,
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="d-flex align-items-start gap-4 flex-wrap">
            <div style={{ flex: 1, minWidth: 200 }}>{children}</div>
            <div className=" rounded overflow-hidden" style={{ width: 250, height: 350 }}>
              <img
                src={resolveStrapiMediaUrl(member.image?.url)}
                alt={member.image?.alternativeText}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  filter: 'grayscale(1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TeamTabPanel: React.FC<{ teams?: TeamItem[] }> = ({ teams }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <FadeTransition show={true}>
      {teams?.map((member, idx) => (
        <AccordionItem
          key={member.name}
          open={openIdx === idx}
          onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          member={member}
          last={idx === teams?.length - 1}
        >
          <div className=" d-flex flex-column gap-2 fs-15">
            <div className="primary-text fw-semibold fs-14 font-libre">{member.designation}</div>
            <RichTextBlock blocks={member?.description} className="text-dark" />
            <div
              className="d-flex flex-column gap-4 mt-3"
              style={{
                marginLeft: 8,
              }}
            >
              <a
                href={member.linkedin}
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
                href={`mailto:${member.email}`}
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
        </AccordionItem>
      ))}
    </FadeTransition>
  );
};

const PartnersTabPanel: React.FC<{ operatingPartners?: OperatingPartnerItem[] }> = ({
  operatingPartners,
}) => (
  <FadeTransition show={true}>
    <div className="row g-4 mt-3">
      {operatingPartners?.map((partner, idx) => (
        <div className="col-12 col-sm-6 col-md-4" key={idx}>
          <OperatingPartner partner={partner} />
        </div>
      ))}
    </div>
  </FadeTransition>
);

const VaultPeople: React.FC<{
  teams?: TeamItem[];
  operatingPartners?: OperatingPartnerItem[];
}> = ({ teams, operatingPartners }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="px-4">
      <div className="font-libre fs-42 text-dark mt-5 pt-5 pb-2">Vault People</div>
      <NestedTabs
        tabs={[
          {
            label: 'TEAM',
            content: <TeamTabPanel teams={teams} />,
          },
          {
            label: 'OPERATING PARTNERS',
            content: <PartnersTabPanel operatingPartners={operatingPartners} />,
          },
        ]}
        tabClassName="justify-content-end mb-2 fs-14 fw-medium text-secondary"
        tabPanelClassName="mb-5 position-relative overflow-hidden"
        activeTabIdx={pathname?.endsWith('/teams') ? 0 : 1}
        onTabChange={() => {
          router?.push(
            pathname?.endsWith('/operating_partners') ? '/teams' : '/operating_partners'
          );
        }}
      />
    </div>
  );
};

export default VaultPeople;
