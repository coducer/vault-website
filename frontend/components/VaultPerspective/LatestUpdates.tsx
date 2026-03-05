'use client';

import { NewsItem } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { GoArrowDownRight } from 'react-icons/go';
import subImg from '../../public/assests/aboutus.jpg';
import './VaultPerspective.css';

const LatestUpdates = ({ news }: { news: NewsItem[] }) => {
  return (
    <div className={`py-4 py-lg-5 position-relative d-flex flex-column gap-4`}>
      <div className=" px-4 py-4 d-flex flex-column gap-4">
        <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-15">News</div>
        <div className={`font-libre fs-42 pb-4 text-dark`}>Latest updates and announcements</div>
      </div>
      <div className=" mb-5">
        <Link href="pe_advisory" className={`d-block text-decoration-none what-we-do-content`}>
          <div className=" d-flex gap-3 what-we-do-text p-3">
            <div
              className=" position-relative overflow-hidden bg-secondary rounded"
              style={{ height: 220, width: 400 }}
            >
              <Image
                className="carousel-image"
                src={subImg}
                alt="subImg"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            <div className=" flex-grow-1 d-flex flex-column gap-3 justify-content-between">
              <div className=" d-flex  justify-content-between align-items-center">
                <div className="text-uppercase fw-medium fs-13 letter-spacing">
                  Wealth Structuring
                </div>
                <div className="text-uppercase fw-medium fs-13 letter-spacing">
                  December 7, 2025
                </div>
              </div>
              <div className="font-libre fs-24 ">How Swiss Family Office Money Flows</div>
              <div className="d-flex justify-content-between align-items-center  w-100">
                <div className=" text-uppercase fw-medium fs-13 letter-spacing">view more</div>
                <div>
                  <GoArrowDownRight size={30} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LatestUpdates;
