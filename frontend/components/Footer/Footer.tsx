'use client';

import logo from '@/public/assests/Logo 3  1.png';
import homeBg from '@/public/assests/home-img.jpg';
import Image from 'next/image';
import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const siteMapMenu = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: 'aboutus',
  },
  {
    label: 'What We Do',
    submenu: [
      { label: 'Service menu', href: '#' },
      { label: 'Work with Vaults', href: '#' },
      { label: 'Career vaultnews', href: '#' },
      { label: 'Portfolio', href: '#' },
    ],
  },
  {
    label: 'Vault People',
    submenu: [
      { label: 'Vault Story', href: '/vaultstory' },
      { label: 'Team', href: '#' },
      { label: 'Operating Partners', href: '#' },
    ],
  },
  {
    label: 'Vault Perspectives',
    submenu: [
      { label: 'News', href: '#' },
      { label: 'Food For Thought', href: '#' },
    ],
  },
  {
    label: 'Events',
    href: '/event',
  },
  {
    label: 'Career',
    href: '#',
  },
];

const governanceLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Business', href: '/terms-of-business' },
  { label: 'Cookie Notice', href: '/cookie-notice' },
  { label: 'Compliance', href: '/compliance' },
];

const Footer = () => {
  const [footerSubmenuOpen, setFooterSubmenuOpen] = useState<number | null>(null);

  const handleSubmenuToggle = (idx: number) => {
    setFooterSubmenuOpen(footerSubmenuOpen === idx ? null : idx);
  };

  return (
    <footer className="position-relative d-flex flex-column" style={{ minHeight: '530px' }}>
      <div className="img-background-footer">
        <Image src={homeBg} alt="homeBg" />
        <div className="img-overlay-footer"></div>
      </div>
      <div className="footer-section px-4 flex-grow-1 d-flex flex-column flex-lg-row align-items-start justify-content-between gap-4 pt-5 mt-lg-5">
        <div className="mb-4 mb-lg-0" style={{ minWidth: 180 }}>
          <Image src={logo} alt="Vault Logo" />
          <div className="fs-14 mt-3 text-white">Multi Family Office</div>
        </div>
        <div className="mb-4 mb-lg-0" style={{ minWidth: 185 }}>
          <div className="fs-15 text-white fw-medium letter-spacing mb-3">Site Map</div>
          <ul className="list-unstyled mb-0">
            {siteMapMenu.map((item, idx) => (
              <li key={item.label} className="mb-1">
                {item.submenu ? (
                  <>
                    <button
                      className="bg-transparent border-0 text-white fs-13 d-flex align-items-center w-100 text-start"
                      style={{ opacity: 0.6, fontWeight: 100, cursor: 'pointer', padding: 0 }}
                      onClick={() => handleSubmenuToggle(idx)}
                      aria-expanded={footerSubmenuOpen === idx}
                    >
                      <span>{item.label}</span>
                      {/* <span
                        aria-hidden
                        style={{
                          marginLeft: 8,
                          transition: 'transform 0.2s',
                          transform: footerSubmenuOpen === idx ? 'rotate(90deg)' : 'rotate(0deg)'
                        }}
                      >
                        <MdKeyboardArrowRight size={20} />
                      </span> */}
                    </button>
                    <ul
                      className="list-unstyled ps-3 mt-1"
                      style={{
                        maxHeight: footerSubmenuOpen === idx ? '500px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.25s',
                      }}
                    >
                      {item.submenu.map((sub) => (
                        <li key={sub.label}>
                          <a
                            href={sub.href}
                            className="text-white fs-12 text-decoration-none d-block mb-1"
                            style={{ opacity: 0.6 }}
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="text-white fs-13 text-decoration-none d-block"
                    style={{ opacity: 0.6, fontWeight: 100 }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4 mb-lg-0" style={{ minWidth: 185 }}>
          <div className="fs-15 text-white fw-medium letter-spacing mb-3">Governance</div>
          <ul className="list-unstyled mb-0">
            {governanceLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-white fs-13 text-decoration-none d-block mb-2"
                  style={{ opacity: 0.6 }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="fs-15 text-white fw-medium letter-spacing mb-3">Get In Touch</div>
          <div className="text-white fs-13 mb-3" style={{ opacity: 0.6 }}>
            Level 1, Gate Avenue
            <br />
            Dubai International Financial Centre
            <br />
            <br />
            IFZA Properties, DSO-IFZA
            <br />
            IFZA Business Park
            <br />
            Dubai Silicon Oasis
            <br />
            <br />
            <a
              href="mailto:info@thevaultpartners.com"
              className="text-white text-decoration-none"
              style={{ opacity: 0.6 }}
            >
              info@thevaultpartners.com
            </a>
          </div>
        </div>
      </div>
      <div
        className="footer-bottom py-3 d-flex flex-column flex-md-row justify-content-between align-items-center mx-4 mt-auto"
        style={{ rowGap: 14 }}
      >
        <div
          className="text-white fs-15 fw-lighter text-center text-md-start mb-2 mb-md-0"
          style={{ width: '100%', opacity: 0.8 }}
        >
          © 2026 Vault Partners. All rights reserved.
        </div>
        <span>
          <FaLinkedin size={20} color="#fff" />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
