// const express = require("express");
// const Faculty = require("../models/faculty"); // Import Faculty model
// const { Alumni1 } = require("../models/alumnidata"); // Correct import
// const router = express.Router();
// const nodemailer = require("nodemailer");

// console.log("🚀 Alumni1 Model Loaded:", Alumni1); // Checking if model is imported correctly

// // Faculty Login Route
// router.post("/login", async (req, res) => {
//     console.log("🔹 Received Login Request:", req.body);
//     const { email, password } = req.body;

//     try {
//         const faculty = await Faculty.findOne({ email, password });
//         if (!faculty) {
//             console.log("❌ Invalid email or password for:", email);
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         console.log("✅ Faculty Login Successful:", faculty.email);
//         res.json({ message: "Login successful", email: faculty.email });
//     } catch (error) {
//         console.error("🚨 Server Error in Login:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });


// router.get("/filter", async (req, res) => {
//     console.log("🔹 Filter API Called:", req.query); // Log request query

//     try {
//         const filters = {};
//         if (req.query.registrationNumber) filters.registrationNumber = req.query.registrationNumber;
//         if (req.query.batch) filters.batch = req.query.batch;
//         if (req.query.department) filters.department = req.query.department;
//         if (req.query.fullName) filters.fullName = req.query.fullName;
//         if (req.query.email) filters.email = req.query.email;
//         if (req.query.contact) filters.contact = req.query.contact;

//         console.log("🔍 Applied Filters:", filters);  

//         const results = await Alumni1.find(filters);
//         console.log("✅ Results Found:", results);  

//         res.json(results);
//     } catch (error) {
//         console.error("🚨 Error in Filter API:", error);
//         res.status(500).json({ error: "Error fetching alumni data" });
//     }
// });




// router.post('/email-filter-results', async (req, res) => {
//     try {
//         const { selectedAlumni, emailContent } = req.body;

//         // Validate email content
//         if (!emailContent || emailContent.trim() === '') {
//             throw new Error('Email content cannot be empty.');
//         }

//         // Validate alumni selection
//         if (!selectedAlumni || !selectedAlumni.length) {
//             throw new Error('No alumni selected to send emails.');
//         }

//         // Fetch the email addresses and full names of the selected alumni
//         const alumni = await Alumni1.find({ _id: { $in: selectedAlumni } }).select('email fullName');

//         // Validate alumni email addresses and full names
//         if (!alumni.length) {
//             throw new Error('No valid alumni found to send emails.');
//         }

//         // Set up the email transporter
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         // Send emails to the selected alumni
//         const emailPromises = alumni.map(alum => {
//             return transporter.sendMail({
//                 from: process.env.EMAIL_USER,
//                 to: alum.email,
//                 subject: 'Event Information',
//                 text: `Dear ${alum.fullName},\n\n${emailContent}\n\nBest regards,\nYour Team`
//             });
//         });

//         await Promise.all(emailPromises);

//         res.status(200).json({ message: 'Emails sent successfully!' });
//     } catch (error) {
//         console.error('Error sending emails:', error); // Log the error to the console
//         res.status(500).json({ message: 'Failed to send emails.', error: error.message });
//     }
// });






// module.exports = router;



const express = require("express");
const Faculty = require("../models/faculty"); // Import Faculty model
const { Alumni1 } = require("../models/alumnidata"); // Correct import
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

console.log("🚀 Alumni1 Model Loaded:", Alumni1); // Checking if model is imported correctly
console.log("📧 Email User:", process.env.EMAIL_USER); // Log the email user to ensure it's loaded correctly

// Faculty Login Route
router.post("/login", async (req, res) => {
    console.log("🔹 Received Login Request:", req.body);
    const { email, password } = req.body;

    try {
        const faculty = await Faculty.findOne({ email, password });
        if (!faculty) {
            console.log("❌ Invalid email or password for:", email);
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("✅ Faculty Login Successful:", faculty.email);
        res.json({ message: "Login successful", email: faculty.email });
    } catch (error) {
        console.error("🚨 Server Error in Login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Alumni Filter Route
router.get("/filter", async (req, res) => {
  console.log("🔹 Filter API Called:", req.query); // Log request query

  try {
      const filters = {};
      if (req.query.registrationNumber) filters.registrationNumber = req.query.registrationNumber;
      if (req.query.fromBatch && req.query.toBatch) {
          filters.batch = { $gte: req.query.fromBatch, $lte: req.query.toBatch };
      } else if (req.query.fromBatch) {
          filters.batch = { $gte: req.query.fromBatch };
      } else if (req.query.toBatch) {
          filters.batch = { $lte: req.query.toBatch };
      }
      if (req.query.department) filters.department = req.query.department;
      if (req.query.fullName) filters.fullName = req.query.fullName;
      if (req.query.email) filters.email = req.query.email;
      if (req.query.contact) filters.contact = req.query.contact;
      if (req.query.birthday) {
          const birthdayDate = new Date(req.query.birthday);
          const day = birthdayDate.getUTCDate();
          const month = birthdayDate.getUTCMonth() + 1;
          filters.$expr = {
              $and: [
                  { $eq: [{ $dayOfMonth: "$birthday" }, day] },
                  { $eq: [{ $month: "$birthday" }, month] }
              ]
          };
      }
      console.log("🔍 Applied Filters:", filters);

      const results = await Alumni1.find(filters);
      console.log("✅ Results Found:", results);

      res.json(results);
  } catch (error) {
      console.error("🚨 Error in Filter API:", error);
      res.status(500).json({ error: "Error fetching alumni data" });
  }
});

// Email Sending Route
router.post('/email-filter-results', async (req, res) => {
    try {
        const { selectedAlumni, emailContent } = req.body;
        console.log("📧 Email Filter Results Payload:", req.body);

        // Validate email content
        if (!emailContent || emailContent.trim() === '') {
            console.error('Email content is empty.');
            return res.status(400).json({ message: 'Email content cannot be empty.' });
        }

        // Validate alumni selection
        if (!selectedAlumni || !selectedAlumni.length) {
            console.error('No alumni selected to send emails.');
            return res.status(400).json({ message: 'No alumni selected to send emails.' });
        }

        // Fetch the email addresses and full names of the selected alumni
        console.log("📧 Fetching alumni with IDs:", selectedAlumni);
        const alumni = await Alumni1.find({ _id: { $in: selectedAlumni } }).select('email fullName');
        console.log("📧 Selected Alumni After Fetch:", alumni);

        // Validate alumni email addresses and full names
        if (!alumni.length) {
            console.error('No valid alumni found to send emails.');
            return res.status(400).json({ message: 'No valid alumni found to send emails.' });
        }

        // Set up the email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Verify transporter configuration
        transporter.verify((error, success) => {
            if (error) {
                console.error('Error with email transporter configuration:', error);
            } else {
                console.log('Email transporter is configured correctly');
            }
        });

        // Send emails to the selected alumni
        const emailPromises = alumni.map(alum => {
            return transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: alum.email,
                subject: 'Event Information',
                text: `Dear ${alum.fullName},\n\n${emailContent}\n\nBest regards,\nYour Team`
            }).catch(error => {
                console.error(`Error sending email to ${alum.email}:`, error);
                throw error; // Ensure that Promise.all catches this error
            });
        });

        await Promise.all(emailPromises);

        console.log("📧 Emails Sent To:", alumni); // Log the alumni information
        res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error sending emails:', error); // Log the error to the console
        res.status(500).json({ message: 'Failed to send emails.', error: error.message });
    }
});

module.exports = router;