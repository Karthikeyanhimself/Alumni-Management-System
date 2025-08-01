const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure you have a User model

const JWT_SECRET = "mySuperSecretKey"; // Use env variable in production

/** ✅ Middleware to Protect Routes (For Logged-in Users) */
const protect = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Not authorized, no token" });

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
        if (!req.user) return res.status(401).json({ message: "User not found" });

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

/** ✅ Middleware to Authorize Faculty/Admin */
const facultyAuth = async (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Not authorized" });

        if (req.user.role !== "faculty" && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Authorization error" });
    }
};

module.exports = { protect, facultyAuth };
