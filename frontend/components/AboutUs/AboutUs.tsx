import React from 'react';
import './AboutUs.css';
import type { HomeAboutUsData } from '@/lib/strapi';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import FlickButton from '../Buttons/FlickButton';
import { GoArrowUpRight } from 'react-icons/go';

const AboutUs = ({ data }: { data?: HomeAboutUsData | null }) => {
  const title = data?.title ?? '';
  const textLines = Array.isArray(data?.text)
    ? (data?.text as { text?: string }[]).map((t) => t?.text ?? '').filter(Boolean)
    : [];
  const buttonName = data?.buttonName ?? '';
  const link = data?.link ?? '';

  const firstColLines = textLines.slice(0, 1);
  const secondColLines = textLines.slice(1);

  return (
    <div
      className="px-4 py-4 py-lg-5 position-relative d-flex flex-column justify-content-center gap-4 about-us"
      style={{ minHeight: '610px' }}
    >
      <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-15">About Us</div>
      <div className=" font-libre fs-42 pb-4 border-bottom text-white ">{title}</div>
      <Row className="gy-4">
        <Col md={6}>
          {firstColLines.map((line, i) => (
            <div key={i} className="text-justify text-white pb-4">
              {line}
            </div>
          ))}
          {link ? (
            <Link href={link} className="text-decoration-none">
              <FlickButton text={buttonName} sufixIconChildren={<GoArrowUpRight size={20} />} />
            </Link>
          ) : (
            <FlickButton text={buttonName} sufixIconChildren={<GoArrowUpRight size={20} />} />
          )}
        </Col>
        <Col md={6}>
          {secondColLines.map((line, i) => (
            <div key={i} className="text-justify text-white pb-4">
              {line}
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
