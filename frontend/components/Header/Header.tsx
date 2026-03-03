'use client';

import { useDevice } from '@/context/DeviceProvider';
import { useScroll } from '@/context/ScrollProvider';
import logo from '@/public/assests/Logo 3  1.png';
import blackLogo from '@/public/assests/Logoblack.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RiMenu3Fill } from 'react-icons/ri';
import BorderButton from '../Buttons/BorderButton';
import './Header.css';

export const menu = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about_us',
  },
  {
    label: 'What We Do',
    submenu: [
      { label: 'Investments', href: '/vaultinvestment' },
      { label: 'Wealth Services', href: '/wealth_services' },
      { label: 'PE Advisory', href: '/pe_advisory' },
      { label: 'Portfolio', href: '/portfolio' },
    ],
  },
  {
    label: 'Vault People',
    href: '/vault_story',
    submenu: [
      { label: 'Vault Story', href: '/vault_story' },
      { label: 'Team', href: '/vault_story' },
      { label: 'Operating Partners', href: '/vault_story' },
    ],
  },
  {
    label: 'Vault Perspectives',
    submenu: [
      { label: 'News', href: '/news' },
      { label: 'Food For Thought', href: '/blogs' },
    ],
  },
  {
    label: 'Events',
    href: '/events',
  },
  {
    label: 'Career',
    href: '#',
  },
];

const Header = () => {
  const { layoutMode } = useDevice();
  const { scrolled, isHeaderVisible } = useScroll();
  const isCompact = layoutMode === 'compact';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarSubmenuOpen, setSidebarSubmenuOpen] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const isNoWhiteHeader =
    pathname === '/contact' ||
    pathname === '/news' ||
    pathname === '/portfolio' ||
    pathname.startsWith('/news/') ||
    pathname === '/blogs' ||
    pathname.startsWith('/blogs/');

  // Sidebar close handler for escape key and overlay clicks
  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setSidebarSubmenuOpen(null);
  };

  // if (typeof window !== 'undefined') {
  //   if (sidebarOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }
  // }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [sidebarOpen]);

  return (
    <header
      className={`vault-header px-4 py-3 d-flex align-items-center justify-content-between${
        scrolled || isNoWhiteHeader ? ' vault-header-bg-white' : ''
      } ${isHeaderVisible ? 'header-show' : 'header-hide'}`}
    >
      <div className="d-flex align-items-center justify-content-between w-100 gap-3">
        <Image src={scrolled || isNoWhiteHeader ? blackLogo : logo} alt="Vault Logo" width={100} />
        {isCompact ? (
          <>
            <button
              className="btn bg-transparent border-0"
              style={{ padding: 0, minWidth: 'max-content' }}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <RiMenu3Fill size={24} color={scrolled || isNoWhiteHeader ? '#000' : '#fff'} />
            </button>
            <aside
              className={`vault-sidebar${sidebarOpen ? ' open' : ''}`}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: '#fff',
                zIndex: 2100,
                transform: sidebarOpen ? 'translateX(0%)' : 'translateX(-100%)',
                transition: 'transform 0.3s',
                boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center p-4 mb-3">
                <Image src={blackLogo} alt="Vault Logo" width={100} />
                <button
                  className="btn bg-transparent border-0"
                  aria-label="Close menu"
                  onClick={handleSidebarClose}
                  style={{ padding: 0, minWidth: 'max-content' }}
                >
                  <IoMdClose size={24} color="#000" />
                </button>
              </div>
              <nav>
                <ul className="list-unstyled px-4">
                  {menu.map((item, idx) =>
                    !item.submenu ? (
                      <li key={item.label} className="mb-3">
                        <a
                          className="fw-semibold text-dark menu-link fs-16 text-decoration-none"
                          href={item.href}
                          onClick={handleSidebarClose}
                        >
                          {item.label}
                        </a>
                      </li>
                    ) : (
                      <li key={item.label} className="mb-3">
                        <button
                          className="fw-semibold text-dark bg-transparent border-0 d-flex align-items-center menu-link fs-16"
                          onClick={() =>
                            setSidebarSubmenuOpen(idx === sidebarSubmenuOpen ? null : idx)
                          }
                          aria-expanded={sidebarSubmenuOpen === idx}
                        >
                          <span>{item.label}</span>
                          <span
                            style={{
                              marginLeft: 8,
                              transition: 'transform 0.2s',
                              transform:
                                sidebarSubmenuOpen === idx ? 'rotate(90deg)' : 'rotate(0deg)',
                            }}
                          >
                            <MdKeyboardArrowRight size={20} />
                          </span>
                        </button>
                        <ul
                          className={`sidebar-submenu list-unstyled ps-3 mt-2`}
                          style={{
                            maxHeight: sidebarSubmenuOpen === idx ? '500px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.25s',
                          }}
                        >
                          {item.submenu.map((sub) => (
                            <li key={sub.label} className="mb-2">
                              <a
                                className="text-dark menu-card-item"
                                href={sub.href}
                                style={{ textDecoration: 'none', fontSize: '16px' }}
                                onClick={handleSidebarClose}
                              >
                                {sub.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              </nav>
              <div className="px-4 mb-4">
                <a
                  href="/contact"
                  className="fw-semibold fs-14 align-items-center letter-spacing"
                  style={{
                    textDecoration: 'none',
                    color: '#000',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSidebarClose();
                    router.push('/contact');
                  }}
                >
                  Contact
                  <span className="ms-2">
                    <GoArrowUpRight size={24} />
                  </span>
                </a>
              </div>
            </aside>
          </>
        ) : (
          <>
            <nav>
              <ul className="nav align-items-center">
                {menu.map((item, idx) =>
                  !item.submenu ? (
                    <li className="nav-item" key={item.label}>
                      <a
                        className={`nav-link${scrolled || isNoWhiteHeader ? ' text-dark' : ' text-white'}`}
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li
                      className="nav-item menu-parent position-relative"
                      key={item.label}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <a
                        className={`nav-link${scrolled || isNoWhiteHeader ? ' text-dark' : ' text-white'}`}
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.label}
                      </a>
                      <ul className={`menu-card${hoveredIdx === idx ? ' show' : ''}`}>
                        {item.submenu.map((sub) => (
                          <li key={sub.label}>
                            <a className="menu-card-item" href={sub.href}>
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                )}
              </ul>
            </nav>
            <div>
              <BorderButton
                text="Contact"
                style={scrolled || isNoWhiteHeader ? { color: '#000' } : { color: '#fff' }}
                sufixIconChildren={<GoArrowUpRight size={26} />}
                onClick={() => router.push('/contact')}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
