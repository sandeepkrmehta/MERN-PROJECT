import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ barChartData, selectedMonth }) => {
  const data = {
    labels: [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "901-above",
    ],
    datasets: [
      {
        label: `Price Range Distribution for ${selectedMonth}`,
        data: barChartData, // Pass the bar chart data here
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Price Range Distribution
      </h2>
      <div className="relative">
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 14,
                  },
                  color: "#4A5568",
                },
              },
              title: {
                display: true,
                text: `Price Range Distribution for ${selectedMonth}`,
                font: {
                  size: 18,
                },
                color: "#2D3748",
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#4A5568",
                },
              },
              y: {
                grid: {
                  color: "#E2E8F0",
                },
                ticks: {
                  color: "#4A5568",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
