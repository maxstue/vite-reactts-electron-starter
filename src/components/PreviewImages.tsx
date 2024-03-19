import React, { FC, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PrevNextButton from './PrevNextButton';

interface Image {
  src: string;
}

const PreviewImages: FC = () => {
  const slider = useRef<Swiper | null>(null);

  const images: Image[] = [
    {
      src: '/images/preview-images-1.png'
    },
    {
      src: '/images/preview-images-2.png'
    },
    {
      src: '/images/preview-images-3.png'
    },
    {
      src: '/images/preview-images-4.png'
    },
    {
      src: '/images/preview-images-2.png'
    },
    {
      src: '/images/preview-images-3.png'
    }
  ];

  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">Preview Images</h2>
        <PrevNextButton slider={slider} />
      </div>

      <Swiper
        ref={slider}
        spaceBetween={14}
        slidesPerView={2}
        loop={true}
        breakpoints={{
          500: {
            slidesPerView: 3
          },
          620: {
            slidesPerView: 4
          }
        }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <a href="#">
              <img src={img.src} alt="preview-images" className="w-full" />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PreviewImages;