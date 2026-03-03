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
      {detailsData.map((item, idx) => (
        <Row
          className="g-4 pb-5 mb-5"
          style={{ borderBottom: "1px solid var(--border)" }}
          key={idx}
        >
          <Row className="g-4 pb-5 mb-5"
            style={{ borderBottom: "1px solid var(--border)" }}>
            <Col md={6}>
              <div className="font-libre fs-26 text-dark fw-semibold">
                {item.heading}
              </div>
            </Col>
            <Col md={6} className='d-none d-lg-block' />
          </Row>

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