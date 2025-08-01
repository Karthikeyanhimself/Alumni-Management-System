import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailAlumniFilter = () => {
  const [filters, setFilters] = useState({
    registrationNumber: "",
    fromBatch: "",
    toBatch: "",
    department: [],
    birthday: "",
    fullName: "",
    email: "",
    contact: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFilters(prevState => ({
        ...prevState,
        department: checked
          ? [...prevState.department, value]
          : prevState.department.filter(dept => dept !== value)
      }));
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  // Fetch filtered alumni data
  const fetchFilteredData = async () => {
    // Validate batch fields
    if ((filters.fromBatch && !filters.toBatch) || (!filters.fromBatch && filters.toBatch)) {
      alert("Please enter both From Batch and To Batch.");
      return;
    }

    try {
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (Array.isArray(filters[key])) {
          filters[key].forEach(item => queryParams.append(key, item));
        } else if (filters[key].trim()) {
          queryParams.append(key, filters[key].trim());
        }
      });

      const response = await axios.get(`https://alma-vu.onrender.com/api/faculty/filter?${queryParams}`);
      
      // Navigate to EmailFilterResults page with results as state
      navigate("/email-filter-results", { state: { results: response.data } });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Filter Alumni</h2>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="grid grid-cols-1 gap-4">
          <input type="text" name="registrationNumber" placeholder="Registration Number" onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="fromBatch" placeholder="From Batch" onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="toBatch" placeholder="To Batch" onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          
          <div className="relative">
            <button type="button" onClick={toggleDropdown}
              className="border rounded-lg p-2 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-400">
              Select Department
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg">
                <div className="p-2 max-h-40 overflow-y-auto">
                  {["Computer Science", "ECE", "EEE", "Mechanical", "Chemical", "Civil", "AIML"].map(department => (
                    <label key={department} className="block">
                      <input type="checkbox" name="department" value={department} onChange={handleChange} />
                      {department}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <input type="date" name="birthday" onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="contact" placeholder="Contact" onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <p className="mt-4 text-gray-600">Note: If no filters are entered, all data will be fetched.</p>

        <button onClick={fetchFilteredData}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full">
          Filter
        </button>
      </div>
    </div>
  );
};

export default EmailAlumniFilter;
