// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     image: { type: String }, // Store image URL (if any)
//     status: { type: String, default: 'Pending' }, // Default status = Pending
//     createdBy: { type: String}, // Alumni user reference
//     createdAt: { type: Date, default: Date.now }
// });

// const Post = mongoose.model('Post', postSchema);

// module.exports ={
//     Post
// } 


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Store image URL (if any)
    status: { type: String, default: 'Pending' }, // Default status = Pending
    createdBy: { 
        regNo: { type: String, required: true },  // Alumni Registration Number
        email: { type: String, required: true }   // Alumni Email
    },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };

