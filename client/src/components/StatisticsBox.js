import React from "react";

// Utility function for formatting currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const StatisticsBox = ({ statistics = {} }) => {
  const {
    totalAmount = 0,
    totalItemsSold = 0,
    totalItemsNotSold = 0,
  } = statistics;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Statistics
      </h3>
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-500">Total Sale:</span>
        <span className="font-medium text-gray-800">
          {formatCurrency(totalAmount)}
        </span>
      </div>
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-500">Total Sold Items:</span>
        <span className="font-medium text-gray-800">{totalItemsSold}</span>
      </div>
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-500">Total Not Sold Items:</span>
        <span className="font-medium text-gray-800">{totalItemsNotSold}</span>
      </div>
    </div>
  );
};

export default StatisticsBox;
