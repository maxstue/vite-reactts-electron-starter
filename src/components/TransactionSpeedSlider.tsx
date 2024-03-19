import React, { FC, useState } from 'react';
import ReactSlider, { ReactSliderProps } from 'react-slider';

interface TransactionSpeedSliderProps {}

const TransactionSpeedSlider: FC<TransactionSpeedSliderProps> = () => {
  const [speed, setSpeed] = useState<number>(1);

  const renderThumb = (props: ReactSliderProps, state: any) => {
    const thumbStyles: React.CSSProperties = {
      ...props.style,
      width: 20, // Adjust width as needed
      height: 20, // Adjust height as needed
      backgroundColor: '#efac00', // Change color as needed
      borderRadius: '50%', // Make it round
      marginTop: -6, // Adjust positioning vertically
      //transform: 'translateX(-50%)', // Adjust positioning horizontally
      border: '1px solid #fff'
    };

    return <div {...props} style={thumbStyles} />;
  };

  const handleChange = (e: number) => {
    setSpeed(e);
  };

  return (
    <>
      <ReactSlider className="horizontal-slider h-1.5 bg-yellow-color" marks markClassName="transaction-mark" min={1} max={3} thumbClassName="transaction-thumb" trackClassName="transaction-track" renderThumb={renderThumb} onChange={handleChange} />
      <div>
        <p className={`mt-4 ${speed === 2 ? 'text-center' : ''} ${speed === 3 ? 'text-right' : ''} text-xs font-medium leading-none opacity-40`}>
          {speed === 1 ? 'Slow' : ''}
          {speed === 2 ? 'Normal' : ''}
          {speed === 3 ? 'Fast' : ''}
        </p>
      </div>
    </>
  );
};

export default TransactionSpeedSlider;