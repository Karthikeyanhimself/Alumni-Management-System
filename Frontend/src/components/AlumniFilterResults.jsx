import React from "react";
import { useLocation } from "react-router-dom";

const AlumniFilterResults = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const [visibleResults, setVisibleResults] = React.useState(10); // Initially show 10 results

  // Load more results
  const loadMoreResults = () => {
    setVisibleResults((prevVisibleResults) => prevVisibleResults + 10); // Load 10 more results
  };

  // Load less results
  const loadLessResults = () => {
    setVisibleResults((prevVisibleResults) => Math.max(prevVisibleResults - 10, 10)); // Load 10 fewer results, but not less than 10
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mt-6">Results:</h3>

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
                <th className="py-3 px-6 text-left">Birthday</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              {results.slice(0, visibleResults).map((alumni, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition duration-200">
                  <td className="py-2 px-6">{alumni.registrationNumber}</td>
                  <td className="py-2 px-6">{alumni.fullName}</td>
                  <td className="py-2 px-6">{alumni.batch}</td>
                  <td className="py-2 px-6">{alumni.department}</td>
                  <td className="py-2 px-6">{alumni.birthday}</td>
                  <td className="py-2 px-6">{alumni.email}</td>
                  <td className="py-2 px-6">{alumni.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            {visibleResults < results.length && (
              <button
                onClick={loadMoreResults}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Read More
              </button>
            )}
            {visibleResults > 10 && (
              <button
                onClick={loadLessResults}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Read Less
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniFilterResults;