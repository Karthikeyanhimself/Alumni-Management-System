// const express = require('express');
// const {Post} = require('../models/post');
// const router = express.Router();

// /** ✅ 1. Alumni Creates a Post */
// // router.post('/create', async (req, res) => {
// //     try {
// //         const { title, description, image, createdBy } = req.body;
// //         const newPost = new Post({ title, description, image, createdBy });
// //         await newPost.save();
// //         res.status(201).json({ message: 'Post submitted for approval' });
// //     } catch (error) {
// //         res.status(500).json({ error: 'Error creating post' });
// //     }
// // });
// router.post('/create', async (req, res) => {
//     console.log("Request received at /api/posts/create"); // Debugging log
//     console.log("Request Body:", req.body); // Check if request body is coming

//     try {
//         const { title, description, image, createdBy } = req.body;
//         if (!title || !description || !createdBy) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }

//         const newPost = new Post({ title, description, image, createdBy });
//         await newPost.save();
//         res.status(201).json({ message: "Post submitted for approval" });
//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({ error: "Error creating post" });
//     }
// });





// /** ✅ 2. Get All Pending Posts (For Faculty Approval) */
// router.get('/pending', async (req, res) => {
//     try {
//         const posts = await Post.find({ status: 'Pending' });
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching pending posts' });
//     }
// });

// /** ✅ 3. Faculty Approves a Post */
// router.post('/approve/:id', async (req, res) => {
//     try {
//         await Post.findByIdAndUpdate(req.params.id, { status: 'Approved' });
//         res.json({ message: 'Post Approved Successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error approving post' });
//     }
// });

// /** ✅ 4. Fetch Approved Posts (For Landing Page) */
// router.get('/approved', async (req, res) => {
//     try {
//         const posts = await Post.find({ status: 'Approved' });
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching approved posts' });
//     }
// });

// module.exports = router;








const express = require('express');
const { Post } = require('../models/Post');
const router = express.Router();


router.get('/pending', async (req, res) => {
    try {
        const posts = await Post.find({ status: 'Pending' }).populate('createdBy', 'name regNo email'); 
        res.json(posts);
    } catch (error) {
        console.error("Error:", error.stack);
        res.status(500).json({ error: 'Error fetching pending posts' });
    }
});


/** ✅ 3. Faculty Approves a Post */
router.post('/approve/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ message: 'Post Approved Successfully', post: updatedPost });
    } catch (error) {
        console.error("Error:", error.stack);
        res.status(500).json({ error: 'Error approving post' });
    }
});

/** ✅ 4. Fetch Approved Posts (For Landing Page) */
router.get('/approved', async (req, res) => {
    try {
        const posts = await Post.find({ status: 'Approved' });
        res.json(posts);
    } catch (error) {
        console.error("Error:", error.stack);
        res.status(500).json({ error: 'Error fetching approved posts' });
    }
});

module.exports = router;


router.post('/reject/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ message: 'Post Rejected Successfully', post: updatedPost });
    } catch (error) {
        console.error("Error:", error.stack);
        res.status(500).json({ error: 'Error rejecting post' });
    }
});



router.post('/create', async (req, res) => {
    try {
        const { title, description, image, createdBy } = req.body;
        
        if (!title || !description || !createdBy.regNo || !createdBy.email) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newPost = new Post({ title, description, image, createdBy });
        await newPost.save();
        
        res.status(201).json({ message: "Post submitted for approval", post: newPost });
    } catch (error) {
        console.error("Error:", error.stack);
        res.status(500).json({ error: "Error creating post" });
    }
});
