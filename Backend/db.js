// const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://anuragbabaojha:Anurag%409262@cluster0.61tqh.mongodb.net/AMS")
//     .then(() => {
//         console.log("✅ Database Connected Successfully");
//     })
//     .catch(err => {
//         console.error("❌ Database Connection Failed:", err);
//         process.exit(1); // Exit the process on failure
//     });

// module.exports = mongoose;

require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => {
        console.log("✅ Database Connected Successfully");
    })
    .catch(err => {
        console.error("❌ Database Connection Failed:", err);
        process.exit(1); // Exit the process on failure
    });

module.exports = mongoose;
