import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AlumniLogin = () => {
    const [regNo, setRegNo] = useState("");
    const [email, setEmail] = useState(""); // Added email state
    const [batch, setBatch] = useState("");
    const [branch, setBranch] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://alma-vu.onrender.com/api/alumni/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ regNo, email, batch, branch, password, dob }), // Include email in request
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userData", JSON.stringify({ regNo, email, batch, branch, dob}));
                navigate("/AlumniDetails");
            } else {
                setError(data.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            setError("Server error. Please try again later.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-center text-orange-600 mb-6">AMS</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mb-4">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        type="text"
                        placeholder="Reg No"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        type="text"
                        placeholder="Batch"
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        type="text"
                        placeholder="Branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-orange-500 text-white py-3 rounded-lg mb-4 hover:bg-orange-600 focus:outline-none disabled:opacity-50"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="text-center">
                    <p>
                        Don't have an account?{" "}
                        <button
                            className="text-orange-500 font-semibold hover:underline"
                            onClick={() => navigate('/AlumniSignUp')}
                        >
                            Create an Account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AlumniLogin;
