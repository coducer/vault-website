'use client';

import { InvestmentWhatWeDoItem } from '@/lib/strapi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoArrowDownRight } from 'react-icons/go';
import './VaultInvestment.css';

type CareerTermType = {
  label: string;
};

const WhatWeDo = ({
  whatWeDoTitle,
  whatWeDoItems,
  careerTitle,
  careerTerms,
}: {
  whatWeDoTitle: string | undefined;
  whatWeDoItems: InvestmentWhatWeDoItem[] | undefined;
  careerTitle?: string | undefined;
  careerTerms?: CareerTermType[] | undefined;
}) => {
  const pathname = usePathname();
  const isPrimarybg = pathname === '/wealth_services' || pathname === '/pe_advisory';
  const isCareer = pathname === '/career';

  return (
    <div
      className={`py-4 py-lg-5 position-relative d-flex flex-column gap-4 ${isPrimarybg ? 'primary-bg' : ''}`}
    >
      <div className=" px-4 py-4 d-flex flex-column gap-4">
        {!isCareer &&
          <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-15">
            what we do
          </div>
        }
        <div
          className={`font-libre fs-42 pb-4 text-dark ${isPrimarybg ? 'text-white' : 'text-dark'}`}
        >
          {whatWeDoTitle}
        </div>
      </div>
      <div className={`mb-5 ${isPrimarybg ? "border-top" : "what-we-do-border"}`}>
        {whatWeDoItems?.map((item, idx) => (
          <Link
            key={item.link ?? idx}
            href={item.link ?? '#'}
            className={`d-block text-decoration-none ${isPrimarybg ? 'what-we-do-content-primary border-bottom' : 'what-we-do-content what-we-do-border-white'}`}
          >

            <div className="d-flex justify-content-between p-4 align-items-center  w-100">
              <div className=' flex-grow-1 d-flex flex-column gap-2 justify-content-between what-we-do-text '>
                {isCareer && (
                  <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-12">
                    {careerTitle}
                  </div>
                )}

                <div className="font-libre fs-20">{item.title}</div>

                {isCareer && careerTerms && Array.isArray(careerTerms) && (
                  <div className="d-flex gap-3 align-items-center fs-15">
                    {careerTerms.map((term, i) => (
                      <div key={i} className="d-flex align-items-center gap-3">
                        <div>{term.label}</div>
                        {i < careerTerms.length - 1 && (
                          <div className='what-we-do-dot' />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
