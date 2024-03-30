import { FC } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './LoginSlide.css';

interface SliderItem {
  title: string;
  description: string;
}

const LoginSlider: FC = () => {
  const sliderList: SliderItem[] = [
    {
      title: 'Welcome to Dapphub',
      description: 'Dapphub is an application built towards a more empowered and equitable digital future in OnChain technology.'
    },
    {
      title: 'Designed for Everyone',
      description: 'Whether you’re a seasoned OnChain explorer or just packing for your first trip, you’ll find it easy to use our app'
    },
    {
      title: 'Security and Privacy',
      description: 'Browse through different OnChain apps without the threat of you information or privacy being stolen'
    }
  ];

  return (
    <div className="w-full lg:max-w-lg xl:max-w-full xl:w-2/3">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true
        }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        className="lg:min-h-screen"
      >
        {sliderList.map((slider, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="max-w-full lg:max-w-2xl xl:max-w-full w-full min-h-[40vh] md:min-h-[60vh] lg:min-h-screen bg-[url(/images/b-g.png)] bg-no-repeat bg-cover flex justify-center items-end">
                <div className="pb-16 text-white text-center px-4">
                  <h2 className="text-2xl md:text-3xl">{slider.title}</h2>
                  <p className="text-base md:text-lg">{slider.description}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default LoginSlider;