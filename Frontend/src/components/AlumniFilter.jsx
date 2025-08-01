
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AlumniFilter = () => {
//   const [filters, setFilters] = useState({
//     registrationNumber: "",
//     fromBatch: "",
//     toBatch: "",
//     department: [],
//     birthday: "",
//     fullName: "",
//     email: "",
//     contact: "",
//   });

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [results, setResults] = useState([]);
//   const [selectedCandidates, setSelectedCandidates] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFilters(prevState => ({
//         ...prevState,
//         department: checked
//           ? [...prevState.department, value]
//           : prevState.department.filter(dept => dept !== value)
//       }));
//     } else {
//       setFilters({ ...filters, [name]: value });
//     }
//   };

//   // Handle sort order change
//   const handleSortOrderChange = (e) => {
//     setSortOrder(e.target.value);
//   };

//   // Fetch filtered alumni data
//   const fetchFilteredData = async () => {
//     if (filters.fromBatch && !filters.toBatch) {
//       alert("Please enter To Batch.");
//       return;
//     }
//     if (!filters.fromBatch && filters.toBatch) {
//       alert("Please enter From Batch.");
//       return;
//     }

//     const isEmpty = Object.values(filters).every(
//       value => typeof value === "string" ? value.trim() === "" : value.length === 0
//     );

//     if (isEmpty) {
//       alert("No fields entered. Fetching all records.");
//     }

//     try {
//       const queryParams = new URLSearchParams();
//       Object.keys(filters).forEach((key) => {
//         if (Array.isArray(filters[key])) {
//           filters[key].forEach(item => queryParams.append(key, item));
//         } else if (filters[key].trim()) {
//           queryParams.append(key, filters[key].trim());
//         }
//       });

//       queryParams.append("sortOrder", sortOrder);

//       const response = await axios.get(`http://localhost:5000/api/faculty/filter?${queryParams}`);
//       setResults(response.data);
//       setSelectedCandidates([]);
//       setSelectAll(false);

//       // Navigate to results page with the filtered data
//       navigate('/alumni-filter-results', { state: { results: response.data } });
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Filter Alumni</h2>

//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <div className="grid grid-cols-1 gap-4">
//           <input type="text" name="registrationNumber" placeholder="Registration Number" onChange={handleChange}
//             className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
//           <input type="text" name="fromBatch" placeholder="From Batch" onChange={handleChange}
//             className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
//           <input type="text" name="toBatch" placeholder="To Batch" onChange={handleChange}
//             className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          
//           <div className="relative">
//             <button type="button" onClick={toggleDropdown}
//               className="border rounded-lg p-2 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-400">
//               Select Department
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg">
//                 <div className="p-2 max-h-40 overflow-y-auto">
//                   {["Computer Science", "ECE", "EEE", "Mechanical", "Chemical", "Civil", "AIML"].map(department => (
//                     <label key={department} className="block">
//                       <input type="checkbox" name="department" value={department} onChange={handleChange} />
//                       {department}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <input type="date" name="birthday" onChange={handleChange}
//             className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
//           <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange}
//             className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
//           <input type="email" name="email" placeholder="Email" onChange={handleChange}
//             className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
//           <input type="text" name="contact" placeholder="Contact" onChange={handleChange}
//             className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />

//           <select value={sortOrder} onChange={handleSortOrderChange}
//             className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </select>
//         </div>

//         <button onClick={fetchFilteredData}
//           className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full">
//           Filter
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AlumniFilter;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AlumniFilter = () => {
  const defaultFilters = {
    registrationNumber: "",
    fromBatch: "",
    toBatch: "",
    department: [],
    birthday: "",
    fullName: "",
    email: "",
    contact: "",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [results, setResults] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
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

  // Handle sort order change
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Fetch filtered alumni data
  const fetchFilteredData = async () => {
    if (filters.fromBatch && !filters.toBatch) {
      alert("Please enter To Batch.");
      return;
    }
    if (!filters.fromBatch && filters.toBatch) {
      alert("Please enter From Batch.");
      return;
    }

    const isEmpty = Object.values(filters).every(
      value => typeof value === "string" ? value.trim() === "" : value.length === 0
    );

    if (isEmpty) {
      alert("No fields entered. Fetching all records.");
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

      queryParams.append("sortOrder", sortOrder);

      const response = await axios.get(`https://alma-vu.onrender.com/api/faculty/filter?${queryParams}`);
      setResults(response.data);
      setSelectedCandidates([]);
      setSelectAll(false);

      // Navigate to results page with the filtered data
      navigate('/alumni-filter-results', { state: { results: response.data } });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Reset filters to default state
  const resetFilters = () => {
    setFilters(defaultFilters);
    setSortOrder("asc");
    setIsDropdownOpen(false);
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
          <input type="text" name="registrationNumber" placeholder="Registration Number" value={filters.registrationNumber} onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="fromBatch" placeholder="From Batch" value={filters.fromBatch} onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="toBatch" placeholder="To Batch" value={filters.toBatch} onChange={handleChange}
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
                      <input type="checkbox" name="department" value={department} onChange={handleChange} 
                        checked={filters.department.includes(department)} />
                      {department}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <input type="date" name="birthday" value={filters.birthday} onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="fullName" placeholder="Full Name" value={filters.fullName} onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="email" name="email" placeholder="Email" value={filters.email} onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="contact" placeholder="Contact" value={filters.contact} onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />

          <select value={sortOrder} onChange={handleSortOrderChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={fetchFilteredData}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Filter
          </button>
          <button onClick={resetFilters}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniFilter;