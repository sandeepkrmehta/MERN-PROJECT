// src/components/PieChart.js

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ pieChartData = [] }) => {
  // Ensure pieChartData is an array before rendering
  if (!Array.isArray(pieChartData) || pieChartData.length === 0) {
    return (
      <div className="bg-red-100 text-red-700 text-center py-4 rounded-lg">
        <p>No data available for the Pie Chart</p>
      </div>
    );
  }

  // Data for the Pie Chart
  const data = {
    labels: pieChartData.map((category) => category.name),
    datasets: [
      {
        label: "Category Distribution",
        data: pieChartData.map((category) => category.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Pie Chart
      </h3>
      <Doughnut data={data} />
      <div className="mt-4">
        <ul className="space-y-2">
          {pieChartData.map((category, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 rounded-md p-3 text-sm font-medium text-gray-700"
            >
              <span>{category.name}</span>
              <span className="text-gray-900">{category.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PieChart;
