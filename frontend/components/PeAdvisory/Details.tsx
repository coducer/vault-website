import { Col, Row } from 'react-bootstrap';

const detailsData = [
  {
    heading: "Vault Advisory opens up a wide range of opportunities to accelerate responsible growth and improve performance of existing investments.",
    body: (
      <>
        Vault PE Advisory engages in special mandates such as restructurings, investment or shareholder protections, governance, and transitional management support. Vault Advisory can be engaged on both: investor or company side. Vault Advisory team is normally deployed if the investment is underperforming or, on the opposite, is preparing for the next stage of growth (I.e. next investment round, M&A or IPO).
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