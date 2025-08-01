// 

import React from "react";
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
    const navigate = useNavigate();

    const cards = [
        { title: "Alumni Credentials", path: "/viewalumni" },
        { title: "Post Dashboard", path: "/faculty-approval" },
        { title: "Filter-Data", path: "/alumni-filter" },
        { title: "Send-Event Mail", path: "/email-alumni-filter" }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Faculty Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {cards.map((card, index) => (
                    <div 
                        key={index} 
                        className="bg-white p-6 rounded-xl border-2 border-blue-500 shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl"
                    >
                        <h2 className="text-2xl font-semibold text-blue-800 mb-4">{card.title}</h2>
                        <button
                            onClick={() => navigate(card.path)}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md border border-blue-700 hover:bg-blue-600 transition"
                        >
                            Open
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};   

export default FacultyDashboard;
