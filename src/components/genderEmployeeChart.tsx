import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { DarkModeContext } from '../context/DarkModeContext';

Chart.register(...registerables);

const PieChart: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);

  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [65, 35], // Ganti dengan data jumlah orang berdasarkan jenis kelamin
        backgroundColor: [
          darkMode ? 'rgba(160, 216, 230, 0.9)' : 'rgba(175, 23, 99, 0.9)',
          darkMode ? 'rgba(150, 150, 200, 0.9)' : 'rgba(255, 99, 132, 0.9)'
        ],
        borderColor: [
          darkMode ? 'rgba(160, 216, 230, 0.9)' : 'rgba(175, 23, 99, 0.9)',
          darkMode ? 'rgba(150, 150, 200, 0.9)' : 'rgba(255, 99, 132, 0.9)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Gender Distribution',
        font: {
          size: 24,
          weight: 'bold' as const
        },
        padding: {
          top: 5,
          bottom: 20 // Tambahkan margin ke bawah yang diinginkan di sini
        },
        position: 'top' as const,
        color: darkMode ? '#edf2f7' : '#2d3748' // Menyesuaikan warna teks judul dengan Dark Mode
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          color: darkMode ? '#fff' : '#000' // Set label color
        }
      }
    }
  };

  return (
    <section
      className={`h-fit w-1/4 shadow-md ${darkMode ? 'bg-gray-900 shadow-white' : 'bg-white'}
        p-4 rounded-lg shadow`}
    >
      <Pie data={data} options={options} />
    </section>
  );
};

export default PieChart;
