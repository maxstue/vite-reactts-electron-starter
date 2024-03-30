/* eslint-disable react/function-component-definition */
import React, { FC, useState } from 'react';
import ReactSlider, { ReactSliderProps } from 'react-slider';

interface TransactionSpeedSliderProps {
  gasPrices: { slow: number, standard: number, fast: number }; // Object with gas prices for different speeds
  onSelect: (price: number) => void; // Callback to send selected gas price back to parent
}

const TransactionSpeedSlider: FC<TransactionSpeedSliderProps> = ({ gasPrices, onSelect }) => {
  // Convert the gasPrices object to an array for easy mapping with the slider
  const pricesArray = [gasPrices.slow, gasPrices.standard, gasPrices.fast];
  const [speed, setSpeed] = useState<number>(1);

  const handleSliderChange = (value: number) => {
    // Assuming `value` is the slider position corresponding to slow, standard, fast
    const gasPriceValues = [gasPrices.slow, gasPrices.standard, gasPrices.fast];
    const selectedGasPrice = gasPriceValues[value - 1];
    onSelect(selectedGasPrice); // Call the callback function with the selected gas price
  };

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

  return (
    <>
      <ReactSlider
        className="horizontal-slider h-1.5 bg-yellow-color"
        marks
        markClassName="transaction-mark"
        min={1}
        max={3}
        thumbClassName="transaction-thumb"
        trackClassName="transaction-track"
        renderThumb={renderThumb}
        onChange={handleSliderChange}
      />
      <div>
        <p className={`mt-4 ${speed === 2 ? 'text-center' : ''} ${speed === 3 ? 'text-right' : ''} text-xs font-medium leading-none opacity-40`}>
          {speed === 1 ? pricesArray[speed - 1] : ''}
          {speed === 2 ? pricesArray[speed - 1] : ''}
          {speed === 3 ? pricesArray[speed - 1] : ''}
        </p>
      </div>
    </>
  );
};

export default TransactionSpeedSlider;
