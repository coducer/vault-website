'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { IoMdClose } from 'react-icons/io'
import logo from "../../public/assests/dcb.jpg"

// Demo logos and info for all items
const portfolioItems = [
  {
    name: 'Polar DC',
    category: 'Incubation and Spin-Off',
    image: logo,
    details: {
      logo: logo,
      companyName: 'POLAR DC',
      headline: 'Polar DC',
      category: 'Incubation and Spin-Off',
      description: 'Polar DC is a data center initiative specializing in digital infrastructure and incubation of innovative digital technologies. Their platform supports next-generation computing and digital transition projects.',
    }
  },
  {
    name: 'CIFR',
    category: 'Incubation and Spin-Off',
    image: logo,
    details: {
      logo: logo,
      companyName: 'CIFR',
      headline: 'CIFR',
      category: 'Incubation and Spin-Off',
      description: 'CIFR is at the forefront of financial rehabilitation, providing incubation for spin-off tech startups and spearheading pioneering fintech solutions.',
    }
  },
  {
    name: 'Anan',
    category: 'Incubation and Spin-Off',
    image: logo,
    details: {
      logo: logo,
      companyName: 'ANAN',
      headline: 'Anan',
      category: 'Incubation and Spin-Off',
      description: 'Anan supports early stage ventures, driving scalable solutions from ideation to spin-off, with a focus on socially impactful technology projects.',
    }
  },
  {
    name: 'Hut8',
    category: 'Incubation and Spin-Off',
    image: logo,
    details: {
      logo: logo,
      companyName: 'HUT 8',
      headline: 'Hut 8',
      category: 'Incubation and Spin-Off',
      description: 'Hut 8 is a leader in high-performance digital mining operations, promoting robust incubation environments for blockchain and dApp spin-offs.',
    }
  },
  {
    name: 'Longbow',
    category: 'Investment',
    image: logo,
    details: {
      logo: logo,
      companyName: 'LONGBOW',
      headline: 'Longbow',
      category: 'Investment',
      description: 'Longbow drives value creation through strategic investments, supporting sustainable growth and industry innovation across multiple sectors.',
    }
  },
  {
    name: 'DCB',
    category: 'Investment',
    image: logo,
    details: {
      logo: logo,
      companyName: 'DMANISI PASTURE',
      headline: 'DCB (Agritech / Livestock)',
      category: 'Investment',
      description: `Dmanisi Cattle Breeding is Georgia’s only large-scale cattle breeding operation, raising 1800 head of premium French Salers cattle on over 1,600 hectares. The farm is developing Georgia’s first hormone-assisted testicular herd to replace imported meat with locally properly adapted genetics. Selected for their adaptation to Georgia’s climate and meat quality, the Salers breed achieves reproduction and fattening rates comparable to their French counterparts, enabling consistent year-round production for the local retail market.`
    }
  }
]

const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  zIndex: 1048,
  transition: 'opacity 0.2s'
}

const sideDrawerStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '100%',
  maxWidth: 480,
  height: '100vh',
  background: '#fff',
  zIndex: 1111,
  boxShadow: '-2px 0 10px rgba(0,0,0,0.10)',
  overflowY: 'auto',
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  animation: 'slideInRight .2s',
}

const closeBtnStyles: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
}

// Slide in animation
if (typeof window !== "undefined" && !document.getElementById('portfolio-drawer-anim')) {
  const style = document.createElement('style')
  style.id = 'portfolio-drawer-anim'
  style.innerHTML = `
    @keyframes slideInRight {
      0% {
        transform: translateX(100%);
        opacity: 0.1;
        filter: blur(8px);
      }
      60% {
        transform: translateX(-5%);
        opacity: 0.9;
        filter: blur(0.5px);
      }
      80% {
        transform: translateX(2%);
        opacity: 1;
        filter: blur(0px);
      }
      100% {
        transform: translateX(0%);
        opacity: 1;
        filter: blur(0px);
      }
    }
  `
  document.head.appendChild(style)
}

const Portfolio = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (openIdx !== null) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
    }
  }, [openIdx]);

  const handleCardClick = (idx: number) => {
    setOpenIdx(idx)
  }

  const handleClose = () => {
    setOpenIdx(null)
  }

  return (
    <div className='px-4'>
      <div className="font-libre fs-42 text-dark mt-5 pt-5 pb-2">Our Portfolio</div>
      <Row className='my-4'>
        {portfolioItems.map((item, idx) => (
          <Col md={4} key={item.name} className='mb-4 d-flex flex-column gap-2'>
            <div
              tabIndex={0}
              role="button"
              aria-label={`About company: ${item.name}`}
              className="d-flex flex-column gap-2 cursor-pointer"
              style={{ outline: 'none' }}
              onClick={() => handleCardClick(idx)}
              onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick(idx)
              }}
            >
              <div
                className='d-flex justify-content-center align-items-center bg-secondary mb-2 carousel-image-wrap position-relative'
                style={{ minHeight: "300px", overflow: "hidden", height: 300 }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className="carousel-image"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  priority
                />
              </div>
              <div className="primary-text text-uppercase letter-spacing fw-semibold fs-13">
                {item.category}
              </div>
              <div className="text-dark fw-medium fs-18">
                {item.name}
              </div>
            </div>
          </Col>
        ))}
      </Row>
      {openIdx !== null && (
        <>
          <div
            style={overlayStyles}
            aria-label="Close details overlay"
            onClick={handleClose}
          />
          <div
            style={sideDrawerStyles}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div className=' mb-5 d-flex justify-content-between align-items-center'>
              <div className="font-libre fs-24 text-dark ">About Company</div>
              <button
                aria-label="Close"
                onClick={handleClose}
                tabIndex={0}
                style={closeBtnStyles}
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="mb-3" style={{ width: 300, maxWidth: "100%" }}>
              <Image
                src={portfolioItems[openIdx].details.logo}
                alt={portfolioItems[openIdx].details.companyName}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 4
                }}
                priority
              />
            </div>
            <div className='d-flex flex-column gap-3'>
              <div className="primary-text text-uppercase letter-spacing fw-semibold fs-13">
                {portfolioItems[openIdx].details.category}
              </div>
              <div className="fw-bold font-libre text-dark fs-20 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
                {portfolioItems[openIdx].details.headline}
              </div>
              <div className="fs-15 text-dark">
                {portfolioItems[openIdx].details.description}
              </div>
              <div className="fs-15 text-dark d-flex gap-2">
                <span>Learn more:</span><a href="/" className='primary-text'> https://www.polardc.com/</a>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Portfolio