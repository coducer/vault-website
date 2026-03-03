/* eslint-disable @next/next/no-img-element */
'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from 'react-icons/go';
import ReusableButton from '../Buttons/ReusableButton/ReusableButton';

export interface EventCarouselItem {
  date: string;
  title: string;
  image: string;
  slug: string;
  id: string;
}

const Events = ({ events: eventsProp }: { events?: EventCarouselItem[] }) => {
  const router = useRouter();
  const eventsData = eventsProp && eventsProp.length > 0 ? eventsProp : [];
  const autoplay = useRef(
    Autoplay({
      delay: 10000, // 10 seconds
      stopOnInteraction: false, // keeps autoplay after manual scroll
      stopOnMouseEnter: true, // pause when hover
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: true,
    },
    [autoplay.current]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="events-wrapper pt-4 pt-lg-5 position-relative d-flex flex-column gap-4">
      <div className="px-4 d-flex flex-column gap-4 py-0 pt-lg-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">events</div>
        <div className="d-flex align-items-center justify-content-between pb-4 flex-wrap">
          <div className="font-libre fs-42  text-dark">The Right Conversations</div>
          <div className=" d-flex align-items-center gap-3">
            <button
              onClick={scrollPrev}
              className="arrow-btn carousel-arrow-left d-none d-lg-block"
              aria-label="Previous"
              style={{
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <GoArrowLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="arrow-btn carousel-arrow-right d-none d-lg-block"
              aria-label="Next"
              style={{
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <GoArrowRight size={20} />
            </button>
            <div>
              <ReusableButton
                text="VIEW ALL"
                sufixIconChildren={<GoArrowUpRight size={20} />}
                className="border-0 bg-transparent text-dark p-0"
                variant="outline"
                style={{ maxWidth: 'max-content' }}
                onClick={() => router.push('/events')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-container d-flex flex-row px-4 pb-5 gap-4 align-items-center me-4">
        <div className="embla w-100" ref={emblaRef}>
          <div className="embla__container d-flex flex-row gap-4">
            {eventsData.map((event: EventCarouselItem, index: number) => (
              <div
                className="embla__slide"
                key={index}
                style={{ minWidth: 600, maxWidth: 660, flex: '0 0 340px' }}
              >
                <div
                  className="carousel-card event-carousel-card position-relative d-flex flex-column overflow-hidden h-100 border-0"
                  style={{
                    transition: 'transform 0.2s',
                  }}
                >
                  <a
                    href={`/event/${event.id}`}
                    className="carousel-image-link text-decoration-none"
                    style={{ color: 'inherit' }}
                    aria-label={`Read article: ${event.title}`}
                  >
                    <div
                      className="carousel-image-wrap w-100 position-relative overflow-hidden bg-secondary"
                      style={{ height: 390 }}
                    >
                      <img
                        className="carousel-image"
                        src={event.image}
                        alt={event.title}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      <div className="read-article fw-light letter-spacing text-white fs-13 text-uppercase d-flex justify-content-center align-items-center gap-2 w-100 h-100">
                        {'READ ARTICLE'}{' '}
                        <span>
                          <GoArrowUpRight size={20} />
                        </span>
                      </div>
                    </div>
                  </a>

                  <div className="py-3">
                    {event.date && <div className="fs-13 fw-medium primary-text">{event.date}</div>}
                    <div className="fs-16 fw-medium text-dark">{event.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
