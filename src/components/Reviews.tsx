import React, { FC, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PrevNextButton from './PrevNextButton';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const Reviews: FC = () => {
  const slider = useRef<Swiper>();

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Olivia Rhye',
      rating: 4.9,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan dui erat'
    },
    {
      id: 2,
      name: 'Olivia Rhye',
      rating: 4.9,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan dui erat'
    },
    {
      id: 3,
      name: 'Olivia Rhye',
      rating: 4.9,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan dui erat'
    },
    {
      id: 4,
      name: 'Olivia Rhye',
      rating: 4.9,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan dui erat'
    }
  ];

  return (
    <div className="py-7">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg md:text-2xl font-semibold">Reviews</h2>
        <PrevNextButton slider={slider} />
      </div>
      <Swiper
        ref={slider}
        spaceBetween={14}
        slidesPerView={2}
        loop={true}
        breakpoints={{
          576: {
            slidesPerView: 3
          }
        }}
      >
        {reviews.map((review: Review) => (
          <SwiperSlide className="p-2 md:py-6 md:px-5 bg-white rounded-xl" key={review.id}>
            <div className="flex justify-between">
              <h2 className="text-base md:text-lg font-medium">{review.name}</h2>
              <div className="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:w-3.5 md:h-3.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M6.99984 1.16666L8.80234 4.81832L12.8332 5.40749L9.9165 8.24832L10.6048 12.2617L6.99984 10.3658L3.39484 12.2617L4.08317 8.24832L1.1665 5.40749L5.19734 4.81832L6.99984 1.16666Z" fill="#EFAC00" stroke="#DB980A" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-yellow-color text-xs font-semibold">{review.rating}</p>
              </div>
            </div>
            <p className="text-offColor text-sm md:text-base leading-snug font-medium">{review.comment}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;