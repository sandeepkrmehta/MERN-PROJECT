// controllers/combinedController.js
const { getStatistics } = require("./statsController");
const { getBarChartData } = require("./chartController");
const { getPieChartData } = require("./pieChartController");

exports.getCombinedData = async (req, res) => {
  try {
    const { month } = req.query; // Get the month from the request query

    // Fetch data from the individual functions
    const statistics = await getStatistics(req); // Fetch statistics
    const barChartData = await getBarChartData(req); // Fetch bar chart data
    const pieChartData = await getPieChartData(req); // Fetch pie chart data

    res.json({
      message: "Combined endpoint works!",
      data: {
        statistics,
        barChartData,
        pieChartData,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
