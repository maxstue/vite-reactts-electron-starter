import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './Slider.css';

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const PriceBar: React.FC = () => {
  const [values, setValues] = useState<{ min: number; max: number }>({ min: 0, max: 100 });

  const handleChange = (newValues: { min: number; max: number }) => {
    setValues(newValues);
    console.log(newValues);
  };

  return (
    <div className="w-full mx-auto mt-8 relative">
      <div className="flex h-28 relative">
        <Bar
          data={{
            labels: ['', '', '', '', '', '', ''],
            datasets: [
              {
                label: '',
                data: [90, 30, 15, 10, 15, 50, 60],
                backgroundColor: ['#EFAC00', '#EFAC00', '#EFAC00', '#EFAC00', '#EFAC00', '#EFAC00', '#EFAC00']
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                enabled: false
              }
            },
            legend: {
              display: false
            }
          }}
        />
      </div>
      <div className="absolute bottom-6 left-8 right-0 z-10">
        <ReactSlider
          onChange={handleChange}
          className="horizontal-slider bg-yellow-color h-1.5 text-xs rounded-sm"
          thumbClassName="price-thumb"
          trackClassName="price-track"
          defaultValue={[0, 100]}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          pearling
          minDistance={10}
        />
      </div>
    </div>
  );
};

export default PriceBar;