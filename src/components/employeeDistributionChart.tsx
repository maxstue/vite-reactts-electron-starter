import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { DarkModeContext } from '../context/DarkModeContext';

Chart.register(...registerables);

const BarChart: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);

  const data = {
    labels: ['Contract Service', 'Security', 'Simpan Pinjam', 'HR'],
    datasets: [
      {
        label: '# of Employee(s)',
        data: [12, 19, 3, 5],
        borderWidth: 1,
        backgroundColor: darkMode ? 'rgba(152, 124, 255, 0.9)' : 'rgba(89, 50, 234, 0.9)',
        borderColor: darkMode ? 'rgba(152, 124, 255, 1)' : 'rgba(89, 50, 234, 0.9)',
        textColor: darkMode ? '#fff' : '#000', // Menyesuaikan warna teks judul dengan Dark Mode
        borderRadius: 10,
        labelColor: darkMode ? '#fff' : '#000' // Set tick color
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' // Set grid color
        },
        ticks: {
          color: darkMode ? '#fff' : '#000' // Set tick color
        }
      },
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' // Set grid color
        },
        ticks: {
          color: darkMode ? '#fff' : '#000' // Set tick color
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Employees Distribution',
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
        labels: {
          color: darkMode ? '#fff' : '#000' // Set label color
        }
      }
    }
  };

  return (
    <section
      className={`w-2/3 shadow-md ${darkMode ? 'bg-gray-900 shadow-white' : 'bg-white'}
        p-4 rounded-lg shadow`}
    >
      <Bar data={data} options={options} />
    </section>
  );
};

export default BarChart;
