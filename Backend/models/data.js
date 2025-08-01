const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    batchFrom: { type: Number, required: true },
    batchTo: { type: Number, required: true },
    branch: { type: String, required: true },
    workingProfile: { type: String, required: true },
    currentWorkplace: { type: String, required: true }
});

module.exports = mongoose.model("Data", DataSchema);
