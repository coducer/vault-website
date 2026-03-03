/* eslint-disable @next/next/no-img-element */
import React from 'react';
import './VaultInvestment.css';
import { Col, Row } from 'react-bootstrap';
import FlickButton from '../Buttons/FlickButton';
import { GoArrowDownRight } from 'react-icons/go';

const currency = '/assests/Crypto,%20Currency,%20Bitcoin,%20Ethereum.png';

const investCards = [
  {
    title: 'AI Infrastructure',
    icon: currency,
  },
  {
    title: 'FinTech Infrastructure',
    icon: currency,
  },
  {
    title: 'Mobility Tech',
    icon: currency,
  },
  {
    title: 'AgriTech',
    icon: currency,
  },
  {
    title: 'HealthTech',
    icon: currency,
  },
];

const WhereWeInvest = () => {
  return (
    <div className="py-5 d-flex flex-column gap-4 primary-bg">
      <div className="px-4  d-flex flex-column gap-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          Where we invest
        </div>
        <div className="font-libre fs-42 pb-4 text-white">Strategic Focus Areas</div>
      </div>
      <Row className="g-0 ">
        {investCards.map((card) => (
          <Col md={4} key={card.title}>
            <div className="invest-card position-relative d-flex flex-column justify-content-between gap-3 p-4 text-white">
              <div className="d-flex justify-content-end align-items-center mb-3">
                <img src={card.icon} alt={`${card.title} Icon`} width={50} height={50} />
              </div>

              <div className="font-libre fs-24 text-white fw-semibold mt-auto">{card.title}</div>
            </div>
          </Col>
        ))}
        <Col md={4} className="d-flex flex-column justify-content-end">
          <div className="mt-auto d-flex justify-content-end px-4">
            <FlickButton
              text="SCHEDULE A CONVERSATION"
              sufixIconChildren={<GoArrowDownRight size={20} />}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WhereWeInvest;
