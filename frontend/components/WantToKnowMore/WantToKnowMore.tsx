'use client';

import type { WantToKnowMoreEntry } from '@/lib/strapi';
import { findWantToKnowMoreForPath } from '@/lib/strapi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import BorderButton from '../Buttons/BorderButton';

const WantToKnowMore = ({ entries }: { entries?: WantToKnowMoreEntry[] | null }) => {
  const pathname = usePathname();
  const data = useMemo(
    () =>
      Array.isArray(entries) && entries.length
        ? findWantToKnowMoreForPath(entries, pathname ?? '')
        : null,
    [entries, pathname]
  );
  const title = data?.title ?? 'Learn more about our work';
  const buttonName = data?.buttonName ?? 'CONNECT WITH US';
  const link = data?.link ?? '/contact';

  const buttonContent = (
    <>
      <div>{buttonName}</div>
      <span>
        <GoArrowUpRight size={20} />
      </span>
    </>
  );

  const cta = link ? (
    <Link
      href={link}
      className="border-btn border-btn-4 d-flex gap-1 align-items-center black-border text-decoration-none"
      style={{ color: '#000' }}
    >
      {buttonContent}
    </Link>
  ) : (
    <BorderButton
      text={buttonName}
      style={{ color: '#000' }}
      sufixIconChildren={<GoArrowUpRight size={20} />}
      borderColorWhite={false}
    />
  );

  return (
    <div className="py-4 py-lg-5 position-relative d-flex flex-column gap-4 bg-secondary">
      <div className="px-4 d-flex flex-column gap-4 py-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          want to know more?
        </div>
        <div className="font-libre fs-42 pb-4 text-dark">{title}</div>
        <div>{cta}</div>
      </div>
    </div>
  );
};

export default WantToKnowMore;
