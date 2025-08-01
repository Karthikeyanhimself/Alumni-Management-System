import React from "react";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="login bg-gray-200 min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <p className="text-gray-700 mb-6">Login to access the full alumni network.</p>

      {/* Login Options */}
      <div className="flex gap-8 mt-6">
        {/* Alumni Login */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition">
          <FaUserGraduate className="text-orange-500 text-5xl mb-3" />
          <Link to={'/AlumniLogin'}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Alumni Login
          </Link>
        </div>

        {/* Faculty Login */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition">
          <FaChalkboardTeacher className="text-blue-500 text-5xl mb-3" />
          <Link to={'/facultylogin'}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Faculty Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
