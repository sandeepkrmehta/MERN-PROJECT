// controllers/chartController.js
const Transaction = require("../models/Transaction");

exports.getBarChartData = async (year, monthIndex) => {
  try {
    const startDate = new Date(`${year}-${monthIndex}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const barChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: { $week: "$dateOfSale" }, // Group by week of the year
          weeklySales: { $sum: "$price" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by week
    ]);

    return {
      labels: barChartData.map((data) => `Week ${data._id}`),
      datasets: [
        {
          label: "Weekly Sales",
          data: barChartData.map((data) => data.weeklySales),
        },
      ],
    };
  } catch (err) {
    throw new Error(`Error fetching bar chart data: ${err.message}`);
  }
};

