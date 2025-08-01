import React, { useState, useEffect } from "react";

const Filter = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setFilteredData(result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.branch.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.workingProfile.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.currentWorkplace.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Alumni Directory</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name, Branch, Workplace..."
        value={search}
        onChange={handleSearch}
        className="w-full max-w-md px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 mb-4"
      />

      {/* Alumni List */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item._id} className="p-4 border-b border-gray-200 hover:bg-blue-100 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-900">{item.name}</h2>
              <p className="text-sm text-gray-700">Branch: {item.branch}</p>
              <p className="text-sm text-gray-700">Batch: {item.batchFrom} - {item.batchTo}</p>
              <p className="text-sm text-gray-700">Profile: {item.workingProfile}</p>
              <p className="text-sm text-gray-700">Workplace: {item.currentWorkplace}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Filter;
