import React, { FC, RefObject } from 'react';

interface PrevNextButtonProps {
  slider: RefObject<any>;
}

const PrevNextButton: FC<PrevNextButtonProps> = ({ slider }) => {
  return (
    <div className="flex gap-1.5">
      <button onClick={() => slider.current.swiper.slidePrev()}>
        <img src="/images/Back.png" alt="backward" />
      </button>

      <button onClick={() => slider.current.swiper.slideNext()}>
        <img src="/images/forward.png" alt="forward" />
      </button>
    </div>
  );
};

export default PrevNextButton;