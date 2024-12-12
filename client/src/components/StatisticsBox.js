import React from 'react';


// Utility function for formatting currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const StatisticsBox = ({ statistics = {} }) => {
  const {
    totalAmount = 0,
    totalItemsSold = 0,
    totalItemsNotSold = 0,
  } = statistics;

  return (
    <div className="statics-data">
      <h3>Statistics</h3>
      <div className="statics">
        <strong>Total Sale:</strong> {formatCurrency(totalAmount)}
      </div>
      <div className="statics">
        <strong>Total Sold Items:</strong> {totalItemsSold}
      </div>
      <div className="statics">
        <strong>Total Not Sold Items:</strong> {totalItemsNotSold}
      </div>
    </div>
  );
};


export default StatisticsBox;
