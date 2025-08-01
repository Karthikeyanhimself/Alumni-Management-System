// 


const express = require("express");
const cors = require("cors");
require("./db");  
const alumniRoutes = require("./routes/alumniroutes");
const facultyRoutes = require("./routes/facultyroutes");
const postRoutes = require("./routes/postRoutes");
const dataroutes = require("./routes/dataroutes"); // ✅ Correct file name
// const AlumniData = require("./models/alumniData");



const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();


// Routes
app.use("/api/alumni", alumniRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/data", dataroutes); // ✅ Fixed import issue




app.get("/", (req, res) => {
    res.send("Welcome to the Alumni & Faculty API!");
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
