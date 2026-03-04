/* eslint-disable @next/next/no-img-element */

'use client';

import { InvestmentInvestItem, resolveStrapiMediaUrl } from '@/lib/strapi';
import { useRouter } from 'next/navigation';
import { Col, Row } from 'react-bootstrap';
import { GoArrowDownRight } from 'react-icons/go';
import FlickButton from '../Buttons/FlickButton';
import './VaultInvestment.css';

const WhereWeInvest = ({
  investTitle,
  investItems,
  buttonName,
  buttonLink,
}: {
  investTitle: string | undefined;
  investItems: InvestmentInvestItem[] | undefined;
  buttonName: string | undefined;
  buttonLink: string | undefined;
}) => {
  const router = useRouter();
  return (
    <div className="py-5 d-flex flex-column gap-4 primary-bg">
      <div className="px-4  d-flex flex-column gap-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          Where we invest
        </div>
        <div className="font-libre fs-42 pb-4 text-white">{investTitle}</div>
      </div>
      <Row className="g-0 ">
        {investItems?.map((card) => (
          <Col md={4} key={card.text}>
            <div className="invest-card position-relative d-flex flex-column justify-content-between gap-3 p-4 text-white">
              <div className="d-flex justify-content-end align-items-center mb-3">
                <img
                  src={resolveStrapiMediaUrl(card.icon?.url)}
                  alt={`${card.text} Icon`}
                  width={50}
                  height={50}
                />
              </div>

              <div className="font-libre fs-24 text-white fw-semibold mt-auto">{card.text}</div>
            </div>
          </Col>
        ))}
        <Col md={4} className="d-flex flex-column justify-content-end">
          <div className="mt-auto d-flex justify-content-end px-4">
            <FlickButton
              text={buttonName ?? ''}
              onClick={() => router.push(buttonLink ?? '')}
              sufixIconChildren={<GoArrowDownRight size={20} />}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WhereWeInvest;
