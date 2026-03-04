import { StrapiRichTextBlock } from '@/lib/strapi';
import { Col, Row } from 'react-bootstrap';
import RichTextBlock from '../RichTextBlock/RichTextBlock';

const Details = ({
  heading,
  body,
}: {
  heading: string | undefined;
  body: string | StrapiRichTextBlock[] | undefined;
}) => {
  return (
    <div className="px-4 py-5 d-flex flex-column gap-4">
      <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-15">
        Introduction
      </div>
      <Row className="pb-5 mt-0">
        <div
          className="font-libre fs-26 text-dark fw-semibold pb-4 mb-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          {heading}
        </div>

        <Col md={2} className="d-none d-lg-block" />
        <Col md={10}>
          <div className="d-flex justify-content-end fs-16">
            <RichTextBlock blocks={body} className="text-dark" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
