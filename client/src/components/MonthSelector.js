import React from "react";

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  // List of months for the dropdown
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <label
        htmlFor="month"
        className="block text-gray-700 font-medium mb-2"
      >
        Select Month:
      </label>
      <select
        id="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
