import React, { useState, useEffect } from 'react';
import TransactionTable from '../components/TransactionTable';
import StatisticsBox from '../components/StatisticsBox';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import MonthSelector from '../components/MonthSelector';
import SearchBox from '../components/SearchBox';
import { fetchStatistics } from '../services/transactionService';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('03'); // Default March
  const [searchQuery, setSearchQuery] = useState('');
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
        console.log('Fetched statistics:', data);
        setStatistics(data.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    loadStatistics();
  }, [selectedMonth, searchQuery]); // Trigger when selectedMonth or searchQuery changes
  
  if (loading) {
    return <div>Loading statistics...</div>;
  }


  return (
    <div className="dashboard">
      <h1>Transaction Dashboard</h1>

      {/* Month Selector */}
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

      {/* Search Box */}
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Transaction Statistics */}
      {loading ? (
        <div>Loading statistics...</div> // Show loading indicator while statistics are being fetched
      ) : (
        <StatisticsBox statistics={statistics} />
      )}

      {/* Transaction Table */}
      <TransactionTable
        selectedMonth={selectedMonth}
        searchQuery={searchQuery}
        page={page}
        perPage={perPage}
        setPage={setPage}
      />

      {/* Bar Chart */}
      <BarChart selectedMonth={selectedMonth} />

      {/* Pie Chart */}
      <PieChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default Dashboard;
