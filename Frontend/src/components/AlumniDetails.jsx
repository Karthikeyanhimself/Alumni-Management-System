import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa"; // Import bell icon

const AlumniDetails = () => {
    const [userData, setUserData] = useState(null);
    const [latestNotification, setLatestNotification] = useState(null);
    const [showUserInfo, setShowUserInfo] = useState(false); // State to track tooltip visibility

    const navigate = useNavigate();

    useEffect(() => {
        // Get user data from local storage
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }

        // Get latest post notification from local storage
        const storedNotifications = JSON.parse(localStorage.getItem("postNotifications")) || [];
        if (storedNotifications.length > 0) {
            setLatestNotification(storedNotifications[storedNotifications.length - 1]); // Get last notification
        }
    }, []);

    // Determine bell icon color based on latest post status
    const getBellColor = () => {
        if (!latestNotification) return "text-gray-400"; // Default (gray) when no notification exists
        return latestNotification.status === "approve" ? "text-green-600" : "text-red-600";
    };

    // Show post title and status when clicking on bell
    const handleBellClick = () => {
        if (latestNotification) {
            alert(`Post Title: ${latestNotification.title}\nStatus: ${latestNotification.status === "approve" ? "Approved ✅" : "Rejected ❌"}`);
        } else {
            alert("No notifications available.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
            {/* Notification Bell Icon with Tooltip */}
            <div className="absolute top-4 right-6 cursor-pointer group" onClick={handleBellClick}>
                <FaBell className={`text-2xl ${getBellColor()}`} />

                {/* Tooltip displaying post title & status */}
                {latestNotification && (
                    <div className="absolute bg-black text-white text-sm px-3 py-1 rounded-md -top-10 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {`"${latestNotification.title}" - ${latestNotification.status === "approve" ? "Approved ✅" : "Rejected ❌"}`}
                    </div>
                )}
            </div>

            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-orange-600">Alumni Details</h2>

                {/* Profile Button with Tooltip */}
                <div 
                    className="w-12 h-12 bg-orange-500 text-white flex items-center justify-center rounded-full cursor-pointer shadow-lg text-lg font-bold mt-4 relative"
                    onMouseEnter={() => setShowUserInfo(true)}
                    onMouseLeave={() => setShowUserInfo(false)}
                >
                    {userData?.email?.charAt(0)?.toUpperCase() || "A"}

                    {/* Tooltip with User Details */}
                    {showUserInfo && userData && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-14 bg-black text-white text-sm px-4 py-2 rounded-md shadow-md w-max">
                            <p><strong>Name:</strong> {userData.name || "N/A"}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>DOB:</strong> {userData.dob}</p>
                            <p><strong>DOB:</strong> {userData.batch}</p>
                            
                        </div>
                    )}
                </div>

                {/* Create Post Button */}
                <button 
                    className="mt-6 bg-orange-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-orange-600 transition"
                    onClick={() => navigate("/createpost")}
                >
                    Create Post
                </button>
            </div>
        </div>
    );
};

export default AlumniDetails;
