const express = require("express");
const Data = require("../models/data");  // ✅ Correct variable name

const router = express.Router();

// GET all data
router.get("/", async (req, res) => {
    try {
        const data = await Data.find();  // ✅ Now it will work
        if (data.length === 0) {
            return res.status(200).json({ message: "No data found", data: [] });
        }
        res.json(data);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});



const validateFields = (data) => {
    const requiredFields = ["name", "dob", "batchFrom", "batchTo", "branch", "workingProfile", "currentWorkplace"];
    let missingFields = [];

    requiredFields.forEach(field => {
        if (!data[field] || data[field].toString().trim() === "") {
            missingFields.push(field);
        }
    });

    return missingFields;
};

// ✅ POST route to add data
router.post("/add", async (req, res) => {
    try {
        console.log("Received Data:", req.body);  // ✅ Debugging log

        const missingFields = validateFields(req.body);

        // ✅ If any required field is missing, return an error
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
        }

        // ✅ Convert date properly
        const newData = new Data({
            name: req.body.name,
            dob: new Date(req.body.dob),
            batchFrom: parseInt(req.body.batchFrom),
            batchTo: parseInt(req.body.batchTo),
            branch: req.body.branch,
            workingProfile: req.body.workingProfile,
            currentWorkplace: req.body.currentWorkplace
        });

        await newData.save();
        res.status(201).json({ message: "Data added successfully", data: newData });

    } catch (err) {
        console.error("Error adding data:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});








// ✅ Ensure the router is exported correctly
module.exports = router;
