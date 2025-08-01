import React, { useState } from "react";

export default function AlumniSignupComp(){
    const [regNo, setRegNo] = useState("");
    const [batch, setBatch] = useState("");
    const [branch, setBranch] = useState("");
    const [email, setEmail] = useState("");  // Added state for email
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async () => {
        try {
            const response = await fetch("https://alma-vu.onrender.com/api/alumni/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ regNo, batch, branch, email, password, dob }),  // Include email
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("Server error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">AMS</h2>
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                <div className="mb-4">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Reg No"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Batch"
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  // Handling Email input
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="date"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4 hover:bg-blue-600 focus:outline-none"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};
