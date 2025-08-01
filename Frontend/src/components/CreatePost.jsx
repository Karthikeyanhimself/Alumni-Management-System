// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const userData = JSON.parse(localStorage.getItem("userData")); // ✅ userData में email भी होना चाहिए

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const postData = { 
//       title, 
//       description, 
//       image, 
//       createdBy: {  
//         regNo: userData.regNo,  // ✅ अब createdBy में regNo और email दोनों हैं
//         email: userData.email
//       }
//     };
    
//     try {
//       await axios.post("http://localhost:5000/api/posts/create", postData);
//       alert("Post submitted for approval!");
//       setTitle("");
//       setDescription("");
//       setImage("");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       alert("Error creating post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div 
//         className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-700">Create a Post</h2>
//         <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default CreatePost;









import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa"; // ✅ Import Notification Icon

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(false); // ✅ Track notifications

  const userData = JSON.parse(localStorage.getItem("userData")); 

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = { 
      title, 
      description, 
      image, 
      createdBy: {  
        regNo: userData.regNo,  
        email: userData.email
      }
    };
    
    try {
      await axios.post("https://alma-vu.onrender.com/api/posts/create", postData);
      alert("Post submitted for approval!");
      setTitle("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Notification Icon */}
      <div className="absolute top-5 right-5 cursor-pointer">
        <FaBell className="text-2xl text-gray-700" />
        {unreadNotifications && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </div>

      {/* Create Post Card */}
      <motion.div 
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Create a Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
