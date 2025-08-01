import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const FilterResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const response = await axios.get(`https://alma-vu.onrender.com/api/faculty/filter${location.search}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchFilteredData();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h3 className="text-3xl font-semibold text-gray-800">Filtered Alumni Results</h3>

      {results.length === 0 ? (
        <p className="text-gray-600 mt-4">No results found</p>
      ) : (
        <div className="w-full overflow-x-auto mt-4">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Registration No.</th>
                <th className="py-3 px-6 text-left">Full Name</th>
                <th className="py-3 px-6 text-left">Batch</th>
                <th className="py-3 px-6 text-left">Department</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              {results.map((alumni, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition duration-200">
                  <td className="py-2 px-6">{alumni.registrationNumber}</td>
                  <td className="py-2 px-6">{alumni.fullName}</td>
                  <td className="py-2 px-6">{alumni.batch}</td>
                  <td className="py-2 px-6">{alumni.department}</td>
                  <td className="py-2 px-6">{alumni.email}</td>
                  <td className="py-2 px-6">{alumni.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FilterResults;
