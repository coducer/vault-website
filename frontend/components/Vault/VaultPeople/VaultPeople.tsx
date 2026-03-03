/* eslint-disable @next/next/no-img-element */
'use client'

import ReusableButton from "@/components/Buttons/ReusableButton/ReusableButton"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useRef } from 'react'
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from 'react-icons/go'

export interface TeamCarouselItem {
  id: string;
  name: string;
  image: string;
  designation?: string;
}

const peopleDataFallback: TeamCarouselItem[] = [
  { id: '1', name: 'Elon Musk', designation: 'CEO, Tesla/SpaceX', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg' },
  { id: '2', name: 'Jane Goodall', designation: 'Founder, Jane Goodall Institute', image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Jane_Goodall_Washington_University_2018.jpg' },
  { id: '3', name: 'Sundar Pichai', designation: 'CEO, Google/Alphabet', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sundar_pichai.png' },
  { id: '4', name: 'Satya Nadella', designation: 'CEO, Microsoft', image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Satya_Nadella_2017.jpg' },
]

const VaultPeople = ({ teams }: { teams?: TeamCarouselItem[] }) => {
  const peopleData = teams && teams.length > 0 ? teams : peopleDataFallback;
  const autoplay = useRef(
    Autoplay({
      delay: 10000,
      stopOnInteraction: false,
      stopOnMouseEnter: true
    })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
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
    <div className=" py-4 pt-lg-5 position-relative d-flex flex-column gap-4 primary-bg">
      <div className="px-4 d-flex flex-column gap-4 py-0 pt-lg-4">
        <div className="primary-text text-uppercase letter-spacing fw-semibold fs-15">
          VAULT PEOPLE
        </div>
        <div className="d-flex align-items-center justify-content-between pb-4 flex-wrap">
          <div className="font-libre fs-42 text-white">
            Guided by Experience
          </div>
          <div className="d-flex align-items-center gap-3">
            <button onClick={scrollPrev} className="arrow-btn carousel-arrow-left d-none d-lg-block" aria-label="Previous"
              style={{
                background: "transparent",
                cursor: "pointer",
                borderColor: "#fff",
                color: "#fff"
              }}
            >
              <GoArrowLeft size={20} />
            </button>
            <button onClick={scrollNext} className="arrow-btn carousel-arrow-right d-none d-lg-block" aria-label="Next"
              style={{
                background: "transparent",
                cursor: "pointer",
                borderColor: "#fff",
                color: "#fff"
              }}
            >
              <GoArrowRight size={20} />
            </button>
            <div>
              <ReusableButton
                text="VIEW ALL"
                sufixIconChildren={<GoArrowUpRight size={20} />}
                className="border-0 bg-transparent text-white p-0"
                variant="outline"
                style={{ maxWidth: "max-content" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="carousel-container d-flex flex-row px-4 pb-5 gap-4 align-items-center me-4">
        <div className="embla w-100" ref={emblaRef}>
          <div className="embla__container d-flex flex-row gap-4">
            {peopleData.map((person, index) => (
              <div className="embla__slide" key={person.id || index} style={{ minWidth: 340, maxWidth: 400, flex: "0 0 340px" }}>
                <div className="card event-carousel-card position-relative d-flex flex-column overflow-hidden h-100 border-0 bg-transparent" style={{ background: "transparent", boxShadow: "none" }}>
                  <div
                    className="carousel-image-wrap w-100 position-relative overflow-hidden primary-bg d-flex align-items-end"
                    style={{ height: 420 }}
                  >
                    <img
                      className="carousel-image"
                      src={person.image}
                      alt={person.name}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        filter: "grayscale(1)"
                      }}
                    />
                  </div>
                  <div className="pt-3 pb-2 px-2" style={{ background: "transparent" }}>
                    <div className="fs-13 fw-medium text-secondary">
                      {person.designation}
                    </div>
                    <div className="fs-16 fw-medium text-white">
                      {person.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaultPeople