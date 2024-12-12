// controllers/pieChartController.js
const Transaction = require("../models/Transaction");

exports.getPieChartData = async (req) => {
  try {
    const { month } = req.query;

    const [year, monthIndex] = month.split("-");
    if (!year || !monthIndex || isNaN(year) || isNaN(monthIndex)) {
      throw new Error("Invalid month format. Use YYYY-MM.");
    }

    const startDate = new Date(`${year}-${monthIndex}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    // Aggregate data by category for the given month
    const pieChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: "$category", // Group by category
          totalSales: { $sum: "$price" },
        },
      },
    ]);

    return {
      labels: pieChartData.map((data) => data._id),
      datasets: [
        {
          data: pieChartData.map((data) => data.totalSales),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Example colors
        },
      ],
    };
  } catch (err) {
    throw new Error(`Error fetching pie chart data: ${err.message}`);
  }
};
