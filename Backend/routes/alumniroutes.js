// const express = require("express");
// const jwt = require("jsonwebtoken");
// const {Alumni} = require('../models/alumni')
// const router = express.Router();

// // Sign Up (No hashing for now)
// router.post("/signup", async (req, res) => {
//     try {
//         const { regNo, batch, branch, password, email, dob } = req.body;
//         const existingAlumni = await Alumni.findOne({ regNo });

//         if (existingAlumni) {
//             return res.status(400).json({ message: "Alumni already exists" });
//         }

//         const newAlumni = new Alumni({
//             regNo,
//             batch,
//             branch,
//             password,  // No hashing
//             email,  // Added email
//             dob
//         });

//         await newAlumni.save();
//         res.status(201).json({ message: "Alumni registered successfully" });

//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // Login (No password hashing, comparing plain text password)
// router.post("/login", async (req, res) => {
//     try {
//         const { regNo, batch, branch, email, password } = req.body;

//         const alumini = await Alumni.findOne({
//             regNo  : regNo,
//             batch : batch,
//             branch : branch,
//             email : email,
//             password : password,
//         })

//         if(!alumini){
//             res.status(202).json({ message: "User not found!" });
//         }

//         res.status(200).json({
//             alumini,
//             message: "Login Sucessful" 
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// });


// router.get("/view-alumni", async (req, res) => {
//     try {
//         const alumniList = await Alumni.find(); // Fetch all alumni records

//         if (!alumniList || alumniList.length === 0) {
//             return res.status(404).json({ message: "No alumni found" });
//         }

//         res.status(200).json(alumniList);

//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// });








// module.exports = router;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Alumni } = require("../models/alumni");

const router = express.Router();
const JWT_SECRET = "mySuperSecretKey"; // Change this in production

/** ✅ Alumni Sign Up (WITH PASSWORD HASHING) */
router.post("/signup", async (req, res) => {
    try {
        const { regNo, batch, branch, email, dob, password } = req.body;

        const existingAlumni = await Alumni.findOne({ email });
        if (existingAlumni) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAlumni = new Alumni({
            regNo,
            batch,
            branch,
            email,
            dob,
            password: hashedPassword, // Save hashed password
        });

        await newAlumni.save();
        res.status(201).json({ message: "Alumni registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/** ✅ Alumni Login (WITH PASSWORD HASHING) */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const alumni = await Alumni.findOne({ email });

        if (!alumni) return res.status(401).json({ message: "Invalid credentials" });
        console.log(alumni);

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, alumni.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: alumni._id, role: "alumni" }, JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, alumni, message: "Login Successful" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/** ✅ View All Alumni (Protected Route) */
router.get("/view-alumni", async (req, res) => {
    try {
        const alumniList = await Alumni.find({}, "-password"); // Exclude password field

        if (!alumniList.length) {
            return res.status(404).json({ message: "No alumni found" });
        }

        res.status(200).json(alumniList);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // ✅ Securely stored in .env
        pass: process.env.EMAIL_PASS, // ✅ Securely stored in .env
    },
});

// 📌 Email Sending Route
router.post("/send-email", async (req, res) => {
    try {
        const { email, subject, message } = req.body;

        // Validate input
        if (!email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // ✅ Matches the sender email
            to: email,
            subject: subject,
            text: message,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.json({ success: "Email sent successfully" });
    } catch (error) {
        console.error("Email sending error:", error); // 🛠️ Debugging log
        res.status(500).json({ error: "Failed to send email", details: error.message });
    }
});





module.exports = router;

