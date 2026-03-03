import { Col, Row } from 'react-bootstrap';

const detailsData = [
  {
    heading: "Our wealth services bring together network of HNWIs who share our values of responsible growth.",
    body: (
      <>
        Vault’s Wealth services support the structuring, protection and long-term oversight of private wealth through established vehicles in Switzerland and the UAE.
        We start with a global review of a client’s assets, existing structures, banking relationships and governance arrangements. Based on this assessment, we design and coordinate a structure that reflects the client’s priorities, risk tolerance and long-term objectives.
      </>
    ),
  },
];

const Details = () => {
  return (
    <div className="px-4 py-5 d-flex flex-column gap-4">
      <div className=" primary-text text-uppercase letter-spacing fw-semibold fs-15">
        Introduction
      </div>
      {detailsData.map((item, idx) => (
        <Row
          className="pb-5 mt-0"
          key={idx}
        >
          <div className="font-libre fs-26 text-dark fw-semibold pb-4 mb-4" style={{ borderBottom: "1px solid var(--border)" }}>
            {item.heading}
          </div>

          <Col md={2} className='d-none d-lg-block' />
          <Col md={10}>
            <div className="d-flex justify-content-end fs-16">
              {item.body}
            </div>
          </Col>
        </Row>
      ))}
    </div>
  )
}

export default Details