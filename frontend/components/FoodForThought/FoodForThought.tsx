/* eslint-disable @next/next/no-img-element */
'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from 'react-icons/go';
import { BlogCarouselItem } from '../Blogs/Blogs';
import ReusableButton from '../Buttons/ReusableButton/ReusableButton';

const FoodForThought = ({ blogs: blogsProp }: { blogs?: BlogCarouselItem[] }) => {
  const router = useRouter();
  const blogsData = blogsProp && blogsProp.length > 0 ? blogsProp : [];
  const autoplay = useRef(
    Autoplay({
      delay: 10000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
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
    <div className="foodforthought-wrapper pt-4 pt-lg-5 position-relative d-flex flex-column gap-4">
      <div className="px-4 d-flex flex-column gap-4 py-0 pt-lg-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          FOOD FOR THOUGHT
        </div>
        <div className="d-flex align-items-center justify-content-between pb-4 flex-wrap">
          <div className="font-libre fs-42  text-dark">Insights</div>
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
                onClick={() => router.push('/news')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="carousel-container d-flex flex-row px-4 pb-5 gap-4 align-items-center me-4">
        <div className="embla w-100" ref={emblaRef}>
          <div className="embla__container d-flex flex-row gap-4">
            {blogsData.map((insight, index) => (
              <div
                className="embla__slide"
                key={index}
                style={{ minWidth: 340, maxWidth: 400, flex: '0 0 340px' }}
              >
                <div
                  className="card event-carousel-card position-relative d-flex flex-column overflow-hidden h-100 border-0"
                  style={{
                    transition: 'transform 0.2s',
                  }}
                >
                  <a
                    href={`/news/${insight.id}`}
                    className="carousel-image-link text-decoration-none"
                    style={{ color: 'inherit' }}
                    aria-label={`Read article: ${insight.title}`}
                  >
                    <a
                      href={`/news/${insight.id}`}
                      className="carousel-image-link text-decoration-none"
                      style={{ color: 'inherit' }}
                      aria-label={`Read article: ${insight.title}`}
                    >
                      <div
                        className="carousel-image-wrap w-100 position-relative overflow-hidden bg-secondary"
                        style={{ height: 220 }}
                      >
                        <img
                          className="carousel-image"
                          src={insight.image}
                          alt={insight.title}
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
                  </a>
                  <div className="pt-3">
                    {insight.date && (
                      <div className="fs-13 fw-medium primary-text mb-1">{insight.date}</div>
                    )}
                    <div className="fs-16 fw-medium text-dark">{insight.title}</div>
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

export default FoodForThought;
