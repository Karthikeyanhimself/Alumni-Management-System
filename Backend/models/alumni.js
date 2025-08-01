// const mongoose = require("mongoose");

// // Alumni Schema
// const AlumniSchema = new mongoose.Schema({
//     regNo: { type: String, required: true, unique: true },
//     batch: { type: String, required: true },
//     branch: { type: String, required: true },
//     password: { type: String, required: true, },
//     email: { type: String, required: true, unique: true },
//     dob: { type: Date, required: true }
// });
// const Alumni = mongoose.model("Alumni", AlumniSchema);

// const AlumniData= new mongoose.Schema({
//     registrationNumber: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     batch: {
//       type: String,
//       required: true
//     },
//     department: {
//       type: String,
//       required: true
//     },
//     birthday: {
//       type: Date,
//       required: true
//     },
//     fullName: {  
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     contact: {
//       type: String,
//       required: true
//     }
//   });
  
//   module.exports = mongoose.model('Alumni1', AlumniData);






// module.exports = { Alumni };


const mongoose = require("mongoose");

// Alumni Schema
const AlumniSchema = new mongoose.Schema({
    regNo: { type: String, required: true, unique: true },
    batch: { type: String, required: true },
    branch: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true }
});

const Alumni = mongoose.model("Alumni", AlumniSchema);




module.exports = { Alumni};

