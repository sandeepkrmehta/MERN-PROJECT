import React, { useState, useEffect } from "react";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5001/api/transactions?search=i&page=${page}&perPage=${perPage}`
      );
      const result = await response.json();

      if (!response.ok)
        throw new Error(result.error || "Failed to fetch transactions");

      setTransactions(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Transaction List</h2>

      {loading && <p className="text-center text-blue-500">Loading transactions...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="px-6 py-3 text-sm font-medium">Product Title</th>
              <th className="px-6 py-3 text-sm font-medium">Description</th>
              <th className="px-6 py-3 text-sm font-medium">Price</th>
              <th className="px-6 py-3 text-sm font-medium">Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-b last:border-none hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-sm">{transaction.title}</td>
                  <td className="px-6 py-4 text-sm">{transaction.description}</td>
                  <td className="px-6 py-4 text-sm">${transaction.price}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(transaction.dateOfSale).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            page <= 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page <span className="font-bold">{page}</span>
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={transactions.length < perPage}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            transactions.length < perPage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
