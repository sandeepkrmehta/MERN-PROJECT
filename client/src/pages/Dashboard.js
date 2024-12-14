import React, { useState, useEffect } from "react";
import TransactionTable from "../components/TransactionTable";
import StatisticsBox from "../components/StatisticsBox";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import MonthSelector from "../components/MonthSelector";
import SearchBox from "../components/SearchBox";
import { fetchStatistics } from "../services/transactionService";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("03"); // Default March
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch statistics when the selected month changes or search query changes
  useEffect(() => {
    const loadStatistics = async () => {
      setLoading(true); // Set loading to true when data is being fetched
      try {
        const data = await fetchStatistics(selectedMonth);
        setStatistics(data.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    loadStatistics();
  }, [selectedMonth, searchQuery]); // Trigger when selectedMonth or searchQuery changes

  // Show loading spinner if the data is still being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-700">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div className="dashboard bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Transaction Dashboard
      </h1>

      {/* Month Selector and Search */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 w-full">
        <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Circular Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center w-full max-w-5xl">
        {/* Statistics */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100">
            <span className="text-lg font-bold text-blue-700">Stats</span>
          </div>
          <p className="mt-4 text-center text-gray-700 font-medium">Statistics Overview</p>
          <StatisticsBox statistics={statistics} />
        </div>

        {/* Bar Chart */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-100">
            <span className="text-lg font-bold text-green-700">Bar</span>
          </div>
          <p className="mt-4 text-center text-gray-700 font-medium">Monthly Trends</p>
          <BarChart selectedMonth={selectedMonth} />
        </div>

        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 flex items-center justify-center rounded-full bg-yellow-100">
            <span className="text-lg font-bold text-yellow-700">Pie</span>
          </div>
          <p className="mt-4 text-center text-gray-700 font-medium">Category Distribution</p>
          <PieChart selectedMonth={selectedMonth} />
        </div>
      </div>

      {/* Transaction Table */}
      <div className="mt-12 bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <TransactionTable
          selectedMonth={selectedMonth}
          searchQuery={searchQuery}
          page={page}
          perPage={perPage}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
