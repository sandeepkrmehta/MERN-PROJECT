// src/components/BarChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ barChartData, selectedMonth }) => {
  const data = {
    labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'],
    datasets: [
      {
        label: `Price Range Distribution for ${selectedMonth}`,
        data: barChartData, // Pass the bar chart data here
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bar-chart">
      <span>
      <h2 className='Price-range'>Price Range Distribution</h2>
      </span>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
