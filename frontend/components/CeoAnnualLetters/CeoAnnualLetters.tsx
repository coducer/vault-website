/* eslint-disable @next/next/no-img-element */
'use client';

import { CeoAnnualLetterItem, resolveStrapiMediaUrl } from '@/lib/strapi';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GoArrowRight, GoDotFill } from 'react-icons/go';

const CeoAnnualLetters = ({
  letters,
  isDownload = false,
  details,
}: {
  letters?: CeoAnnualLetterItem[];
  isDownload?: boolean;
  details?: {
    ceoAnnualLettersSectionTitle?: string | null;
    ceoAnnualLettersSectionImage?: { url?: string | null; alternativeText?: string | null } | null;
    downloadfile?: { url?: string | null } | null;
    downloadButtonLabel?: string | null;
  };
}) => {
  const slides = letters && letters.length > 0 ? letters : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    // Don't call onSelect() synchronously inside effect
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      emblaApi && emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (idx: number) => {
      if (emblaApi) emblaApi.scrollTo(idx);
    },
    [emblaApi]
  );

  const handleDownloadLetter = (url: string) => {
    if (!url) return;
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
      })
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = details?.downloadButtonLabel ?? '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(() => {
        window.open(url, '_blank');
      });
  };

  if (isDownload && details) {
    return (
      <section className="py-5 mt-5">
        <Row>
          <Col md={6}>
            <div className="px-4 d-flex flex-column justify-content-between h-100">
              <div>
                <div
                  className="primary-text text-uppercase letter-spacing fw-semibold fs-12 mb-3"
                >
                  CEO ANNUAL LETTERS
                </div>
                <div className="font-libre fs-32 fw-semibold mb-4">
                  {details.ceoAnnualLettersSectionTitle || 'Strategic vision from Vault’s leadership'}
                </div>
              </div>

              <div>
                {details.downloadfile && resolveStrapiMediaUrl(details.downloadfile?.url ?? '') && (
                  <button
                    type="button"
                    onClick={() =>
                      handleDownloadLetter(resolveStrapiMediaUrl(details.downloadfile?.url ?? ''))
                    }
                    className="annual-letter-link d-flex align-items-center justify-content-between px-0 py-2 mb-2"
                    style={{
                      textDecoration: 'none',
                      borderBottom: '1px solid #dedede',
                      color: '#232323',
                      fontSize: 16,
                      transition: 'color 0.2s',
                      background: 'none',
                      border: 'none',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{details.downloadButtonLabel || 'Annual Letter 2025'}</span>
                    <GoArrowRight />
                  </button>
                )}
              </div>
            </div>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-end p-3 p-md-0">
            <div
              style={{
                background: '#f5f5f7',
                overflow: 'hidden',
                width: '100%',
                maxWidth: 470,
                height: 430,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={resolveStrapiMediaUrl(details.ceoAnnualLettersSectionImage?.url ?? '')}
                alt={details.ceoAnnualLettersSectionImage?.alternativeText || 'CEO Letter'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
            </div>
          </Col>
        </Row>
      </section>
    );
  }

  return (
    <section className="py-5 mt-5">
      <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15 px-4 pb-4">
        CEO ANNUAL LETTERS
      </div>
      <Row className="align-items-center">
        <Col>
          <div ref={emblaRef} className="embla">
            <div className="embla__container">
              {slides.map((slide, idx) => (
                <div className="embla__slide" key={idx}>
                  <Row className=" align-items-center g-4">
                    <Col md={6}>
                      <div className=" px-4">
                        <blockquote className="fs-16 mb-4 pb-3 font-libre">
                          {slide.quote}
                        </blockquote>
                        <div className="d-flex align-items-center gap-2 mt-4">
                          <img
                            src={resolveStrapiMediaUrl(slide.avatar?.url)}
                            alt={slide.avatar?.alternativeText}
                            className="rounded-circle"
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: 'cover',
                              border: '2px solid #eaeaea',
                            }}
                          />
                          <div>
                            <div className="fw-semibold fs-14">{slide.name}</div>
                            <div className="text-muted fs-13">{slide.designation}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col
                      md={6}
                      className=" p-3 p-md-0 d-flex align-items-center justify-content-end"
                    >
                      <div
                        style={{
                          background: '#f5f5f7',
                          overflow: 'hidden',
                          width: '100%',
                          maxWidth: 470,
                          height: 430,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={resolveStrapiMediaUrl(slide.image?.url)}
                          alt="CEO Letter"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-2 px-4 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className=" p-0 border-0 bg-transparent"
                style={{
                  cursor: 'pointer',
                  fontSize: '14px',
                  lineHeight: 1,
                  color: selectedIndex === i ? 'var(--dark)' : '#b5bfd0',
                  transition: 'color 0.15s',
                }}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                tabIndex={0}
              >
                <GoDotFill />
              </button>
            ))}
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default CeoAnnualLetters;
