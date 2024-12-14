import React from "react";

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex justify-center items-center py-4 bg-gray-100">
      <input
        type="text"
        placeholder="Search by title, description, or price"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBox;
