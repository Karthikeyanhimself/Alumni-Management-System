const mongoose = require('mongoose');

const AlumniDataSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  batch: {
    type: String, 
    required: true
  },
  department: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  fullName: {  
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});


const Alumni1 = mongoose.model("Alumni1", AlumniDataSchema);



module.exports = { Alumni1};
