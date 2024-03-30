import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

// eslint-disable-next-line react/function-component-definition
const DoughnutChart: FC = (): JSX.Element => {
  return (
    <div className="max-h-60 mx-auto">
      <Doughnut
        data={{
          // Data object for chart data
          labels: ['BTC', 'BNB', 'Solana', 'Polygon'], // Labels for chart segments
          datasets: [
            // Dataset for chart
            {
              label: '', // Label for dataset
              data: [45, 30, 15, 10], // Data values for each segment
              backgroundColor: ['#EFAC00', '#0094FF', '#28C193', '#5344FF'] // Background colors for segments
            }
          ]
        }}
        options={{
          // Options object for chart customization
          responsive: true, // Make the chart responsive
          plugins: {
            // Plugins configuration
            tooltip: {
              enabled: false // Disable tooltips to remove labels
            }
          }
        }}
      />
    </div>
  );
};

export default DoughnutChart; // Exporting DoughnutChart component
