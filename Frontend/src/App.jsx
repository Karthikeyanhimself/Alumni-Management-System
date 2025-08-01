// import { Routes, Route } from "react-router-dom";  // Fixed import
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Gallery from "./components/Gallery";
// import Alumni from "./components/Alumni";

// import Login from "./components/Login";
// import AlumniLogin from "./components/AlumniLogin";
// import AlumniSignup from "./components/Alumnisignup";
// import AlumniDetails from "./components/Alumnidetails";
// import FacultyLogin from "./components/Facultylogin";
// import FacultyDashboard from "./components/FacultyDashboard";  // Fixed path
// import ViewAlumni from "./components/ViewAlumni";
// import Post from "./components/Post";  // Ensure this component exists
// import CreatePost from "./components/createpost";
// import FacultyApproval from "./components/FacultyApproval";
// import Filter from "./components/filter";
// import AlumniFilter from "./components/AlumniFilter";
// import FilterResults from "./components/FilterResults";
// import Sendemail from "./components/Sendemail";

// import "./App.css";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route index element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/post" element={<Post />} />  {/* Fixed component name */}
       
//         <Route path="/login" element={<Login />} />
//         <Route path="/AlumniLogin" element={<AlumniLogin />} />
//         <Route path="/Alumnisignup" element={<AlumniSignup />} />
//         <Route path="/AlumniDetails" element={<AlumniDetails />} />
//         <Route path="/facultylogin" element={<FacultyLogin />} />
//         <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
//         <Route path="/viewalumni" element={<ViewAlumni />} />
//         <Route path="/alumni" element={<Alumni />} />
//         <Route path="/createpost" element={<CreatePost />} />
//         <Route path="/faculty-approval" element={<FacultyApproval />} />
//         <Route path="/filter" element={<Filter />} />
//         <Route path="/alumni-filter" element={<AlumniFilter />} />
//         <Route path="/filter-results" element={<FilterResults />} />
//         <Route path="/send-email" element={<Sendemail/>} />
        




//       </Routes>
//     </>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";  // Fixed import
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Alumni from "./components/Alumni";

import Login from "./components/Login";
import AlumniLogin from "./components/AlumniLogin";
import AlumniDetails from "./components/AlumniDetails";
import FacultyLoginComp from "./components/Facultylogin";
import FacultyDashboard from "./components/FacultyDashboard";  // Fixed path
import ViewAlumni from "./components/ViewAlumni";
import Post from "./components/Post";  // Ensure this component exists
import CreatePost from "./components/CreatePost";
import FacultyApproval from "./components/FacultyApproval";
import Filter from "./components/Filter";
import AlumniFilter from "./components/AlumniFilter";
import AlumniFilterResults from "./components/AlumniFilterResults";
import EmailAlumniFilter from "./components/EmailAlumniFilter";
import EmailFilterResults from "./components/EmailFilterResults";
import AlumniSignupComp from "./components/Alumnisignup"


import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/post" element={<Post />} />  {/* Fixed component name */}
       
        <Route path="/login" element={<Login />} />
        <Route path="/AlumniLogin" element={<AlumniLogin />} />
        <Route path="/Alumnisignup" element={<AlumniSignupComp />} />
        <Route path="/AlumniDetails" element={<AlumniDetails />} />
        <Route path="/facultylogin" element={<FacultyLoginComp />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/viewalumni" element={<ViewAlumni />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/faculty-approval" element={<FacultyApproval />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/alumni-filter" element={<AlumniFilter />} />
        <Route path="/alumni-filter-results" element={<AlumniFilterResults />} />
        <Route path="/email-alumni-filter" element={<EmailAlumniFilter />} />
        <Route path="/email-filter-results" element={<EmailFilterResults />} />
        
      </Routes>
    </>
  );
}

export default App;
