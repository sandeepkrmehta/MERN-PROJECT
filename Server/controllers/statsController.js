const Transaction = require("../models/Transaction");

exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query; // Get the month from query params

    if (!month) {
      return res.status(400).json({ success: false, error: "Month is required" });
    }

    // Extract year and month from the provided month (e.g., 2023-03)
    const [year, monthIndex] = month.split("-");

    // Validate year and month
    if (!year || !monthIndex || isNaN(year) || isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
      return res.status(400).json({ success: false, error: "Invalid month format. Use YYYY-MM." });
    }

    // Set the start and end dates for the selected month
    const startDate = new Date(`${year}-${monthIndex}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // Move to the next month for the end date

    console.log(`Start Date: ${startDate}, End Date: ${endDate}`); // Debugging log

    // Aggregating statistics data
    const stats = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lt: endDate },  // Filter by date range
        },
      },
      {
        $group: {
          _id: null,  // We are not grouping by anything, we just want a total sum
          totalAmount: { $sum: "$price" },  // Sum of all prices for the given month
          totalItemsSold: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },  // Count of sold items
          totalItemsNotSold: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },  // Count of unsold items
        },
      },
    ]);

    console.log('Aggregated Statistics:', stats); // Debugging log

    // If no data found
    if (!stats.length) {
      return res.status(404).json({ success: false, error: 'No transactions found for this month' });
    }

    // Return the aggregated statistics data
    res.json({
      success: true,
      data: {
        totalAmount: stats[0].totalAmount,
        totalItemsSold: stats[0].totalItemsSold,
        totalItemsNotSold: stats[0].totalItemsNotSold,
      },
    });
  } catch (error) {
    console.error("Error in getStatistics:", error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
