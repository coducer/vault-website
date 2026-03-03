import { Col, Row } from 'react-bootstrap';

const detailsData = [
  {
    heading: "Our foundation is strong operational capacity.",
    body: (
      <>
        Vault backs companies and founders at growth stage, where operational focus, strong fundamentals and controls are becoming crucial for the continued growth and investor support.

        Vault executes its investments through strategic funding, secondary buyouts or M&A.

        Separately, Vault Tech is Vault’s venture arm which backs founders and incubates technology ventures which enhance positive effects or relieve transitional effects of cutting edge developments in AI, FinTech, Energy, Agriculture, Health, etc. Vault Tech works with founders who are deeply experienced in their respective domains but need strong corporate team, network and financial backing for breakthrough.
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