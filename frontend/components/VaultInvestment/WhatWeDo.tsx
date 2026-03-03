'use client'

import { GoArrowDownRight } from 'react-icons/go'
import { usePathname, useRouter } from 'next/navigation'
import './VaultInvestment.css'
import Link from 'next/link'

const WhatWeDo = () => {
  const router = useRouter();
  const pathname = usePathname();


  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const isPrimarybg =
    pathname === '/wealth_services' ||
    pathname === '/pe_advisory';

  return (
    <div className={`py-4 py-lg-5 position-relative d-flex flex-column gap-4 ${isPrimarybg ? "primary-bg" : ""}`}>
      <div className=" px-4 py-4 d-flex flex-column gap-4">
        <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-15">
          what we do
        </div>
        <div className={`font-libre fs-42 pb-4 text-dark ${isPrimarybg ? "text-white" : "text-dark"}`}>Explore our other services</div>
      </div>
      <div className=' mb-5'>
        <Link href='wealth_services'
          className={`d-block text-decoration-none ${isPrimarybg ? "what-we-do-content-primary" : "what-we-do-content"}`}
        >
          <div className="d-flex justify-content-between p-4 align-items-center what-we-do-text w-100">
            <div className='font-libre fs-20 '>
              Wealth Services
            </div>
            <div>
              <GoArrowDownRight size={30} />
            </div>
          </div>
        </Link>
        <Link href='pe_advisory'
          className={`d-block text-decoration-none ${isPrimarybg ? "what-we-do-content-primary" : "what-we-do-content"}`}
        >
          <div className="d-flex justify-content-between p-4 align-items-center what-we-do-text w-100">
            <div className='font-libre fs-20 '>
              PE Advisory
            </div>
            <div>
              <GoArrowDownRight size={30} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default WhatWeDo