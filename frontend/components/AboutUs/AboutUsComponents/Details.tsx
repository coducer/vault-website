import type { AboutDetailItem } from '@/lib/strapi';
import { Col, Row } from 'react-bootstrap';

interface DetailsProps {
  detailsData: AboutDetailItem[];
}

const Details = ({ detailsData }: DetailsProps) => {
  return (
    <div className="px-4 py-5 d-flex flex-column gap-4">
      {detailsData.map((item, idx) => (
        <Row
          className="g-4 pb-5 mb-5"
          style={{ borderBottom: '1px solid var(--border)' }}
          key={idx}
        >
          <Col md={6}>
            <div className="font-libre fs-35 text-dark fw-semibold">{item?.heading}</div>
          </Col>
          <Col md={6} className="d-none d-lg-block" />
          <Col md={2} className="d-none d-lg-block" />
          <Col md={10}>
            <div className="d-flex justify-content-end font-libre fs-18">{item.body}</div>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Details;
