const Transaction = require("../models/Transaction");

exports.listTransactions = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;

    // Validate and parse pagination parameters
    const pageNumber = parseInt(page, 10);
    const itemsPerPage = parseInt(perPage, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ success: false, error: "Invalid page number" });
    }
    if (isNaN(itemsPerPage) || itemsPerPage < 1) {
      return res.status(400).json({ success: false, error: "Invalid perPage value" });
    }

    const query = {};

    // Handle the `month` query parameter correctly
    if (month) {
      const [year, monthIndex] = month.split("-");
      if (!year || !monthIndex || isNaN(year) || isNaN(monthIndex)) {
        return res.status(400).json({ success: false, error: "Invalid month format. Use YYYY-MM." });
      }

      const startDate = new Date(`${year}-${monthIndex}-01T00:00:00Z`);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1); // Move to the next month for the end date

      query.dateOfSale = { $gte: startDate, $lt: endDate };
    }

    // Handle the `search` query for title, description, and price
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];

      // Only apply price filter if the search value is a valid number
      if (!isNaN(search)) {
        query.price = { $eq: parseFloat(search) }; // Apply price equality filter for numeric search
      }
    }

    // Fetch transactions with pagination
    const transactions = await Transaction.find(query)
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);

    // Return the transactions in the response
    res.json({ success: true, data: transactions });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ success: false, error: err.message });
  }
};
