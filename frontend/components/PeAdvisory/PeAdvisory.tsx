import Image from 'next/image'
import { Col, Row } from 'react-bootstrap'
import { GoArrowUpRight } from 'react-icons/go'
import loungeImg from "../../public/assests/event.jpg"
import BorderButton from '../Buttons/BorderButton'

const layer = "/assests/layer-svgrepo-com .png";

const serviceCards = [
  {
    icon: layer,
    title: 'Wealth structuring',
    points: [
      'Cross-asset structuring',
      'Tax-efficient structuring',
      'Ongoing oversight',
    ],
  },
  {
    icon: layer,
    title: 'Investment framework and manager coordination',
    points: [
      'Definition of investment objectives and framework',
      'Support with external manager selection',
      'Review and coordination of investment mandates',
    ],
  },
  {
    icon: layer,
    title: 'Governance, risk, and compliance',
    points: [
      'Governance setup for wealth structures',
      'Policy and reporting frameworks',
      'Cross-border compliance coordination',
    ],
  },
  {
    icon: layer,
    title: 'Estate planning and asset protection',
    points: [
      'Private trust companies and protector arrangements',
      'Succession and asset-protection structuring',
    ],
  },
  {
    icon: layer,
    title: 'Private banking and personal coordination',
    points: [
      'Private banking relationships (Switzerland & UAE)',
      'Bank onboarding and relationship support',
      'Coordination between banks and advisors',
    ],
  },
];

const PeAdvisory = () => {
  return (
    <div className="py-4 px-4 py-lg-5 position-relative d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          PE ADVISORY
        </div>
        <div className="font-libre fs-42 text-dark">
          List of Selected Mandates
        </div>
      </div>
      <div>
        <BorderButton
          text="Schedule A Consultation"
          style={{ color: "#000" }}
          sufixIconChildren={<GoArrowUpRight size={20} />}
          borderColorWhite={false}
        />
      </div>
      <Row className="g-4 pt-1">
        {serviceCards.map((card, idx) => (
          <Col
            key={card.title}
            md={4}
            sm={6}
            xs={12}
            className="d-flex"
            style={{ minHeight: 400 }}
          >
            <div
              className="wealth-service-card h-100 d-flex flex-column justify-content-between p-4 bg-white position-relative w-100 bg-secondary "
              style={{
                borderRadius: 4,
              }}
            >
              <div className="d-flex flex-column gap-3 mb-3">
                <img src={card.icon} alt="" width={50} height={50} style={{ verticalAlign: 'middle' }} />
                <span
                  className="font-libre fs-20 text-dark"
                >
                  {card.title}
                </span>
              </div>
              <ul className="list-unstyled m-0 pt-1 fs-15">
                {card.points.map((p, i) => (
                  <li key={i} className="py-2" style={{ borderBottom: "1px solid var(--border)" }}>{p}</li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
        <Col
          md={4}
          sm={6}
          xs={12}
          className="d-flex"
          style={{ minHeight: 400, overflow: "hidden" }}
        >
          <div
            className="wealth-service-card h-100 d-flex flex-column position-relative w-100 bg-secondary "
            style={{
              borderRadius: 4,
              overflow: "hidden"
            }}
          >
            <Image
              src={loungeImg}
              alt="Contemporary lounge chair in luxury office with city view"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: "100%",
                minHeight: 400,
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PeAdvisory