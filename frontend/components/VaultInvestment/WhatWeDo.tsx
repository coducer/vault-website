'use client';

import { InvestmentWhatWeDoItem } from '@/lib/strapi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoArrowDownRight } from 'react-icons/go';
import './VaultInvestment.css';

const WhatWeDo = ({
  whatWeDoTitle,
  whatWeDoItems,
}: {
  whatWeDoTitle: string | undefined;
  whatWeDoItems: InvestmentWhatWeDoItem[] | undefined;
}) => {
  const pathname = usePathname();
  const isPrimarybg = pathname === '/wealth_services' || pathname === '/pe_advisory';

  return (
    <div
      className={`py-4 py-lg-5 position-relative d-flex flex-column gap-4 ${isPrimarybg ? 'primary-bg' : ''}`}
    >
      <div className=" px-4 py-4 d-flex flex-column gap-4">
        <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-15">
          what we do
        </div>
        <div
          className={`font-libre fs-42 pb-4 text-dark ${isPrimarybg ? 'text-white' : 'text-dark'}`}
        >
          {whatWeDoTitle}
        </div>
      </div>
      <div className=" mb-5">
        {whatWeDoItems?.map((item, idx) => (
          <Link
            key={item.link ?? idx}
            href={item.link ?? '#'}
            className={`d-block text-decoration-none ${isPrimarybg ? 'what-we-do-content-primary' : 'what-we-do-content'}`}
          >
            <div className="d-flex justify-content-between p-4 align-items-center what-we-do-text w-100">
              <div className="font-libre fs-20 ">{item.title}</div>
              <div>
                <GoArrowDownRight size={30} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
