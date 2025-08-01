// // 






// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FacultyApproval = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetchPendingPosts();
//   }, []);

//   // Fetch Pending Posts
//   const fetchPendingPosts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/posts/pending");
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   // Approve/Reject Post
//   const handleApproval = async (postId, status) => {
//     try {
//       await axios.post(`http://localhost:5000/api/posts/${status}/${postId}`);
//       setPosts(posts.filter(post => post._id !== postId)); // Remove from UI
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center">Posts Approval Panel</h2>
      
//       {posts.length === 0 ? (
//         <p className="text-center mt-4">No pending posts for approval.</p>
//       ) : (
//         <div className="mt-6 space-y-4">
//           {posts.map((post) => (
//             <div key={post._id} className="p-4 border rounded shadow">
//               <h3 className="text-lg font-semibold">{post.title}</h3>
//               <p className="text-gray-600">{post.description}</p>
              
//               {post.image && <img src={post.image} alt="Post" className="mt-2 w-40" />}
              
//               {/* ✅ Show Alumni Credentials */}
//               <p className="text-sm text-gray-500 mt-2">
//                 <strong>Posted by:</strong> {post.createdBy?.regNo} - {post.createdBy?.email}
//               </p>
              
//               <div className="mt-3 flex space-x-4">
//                 <button 
//                   className="bg-green-600 text-white px-4 py-2 rounded" 
//                   onClick={() => handleApproval(post._id, "approve")}
//                 >
//                   Approve
//                 </button>
//                 <button 
//                   className="bg-red-600 text-white px-4 py-2 rounded" 
//                   onClick={() => handleApproval(post._id, "reject")}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacultyApproval;







// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FacultyApproval = () => {
//   const [posts, setPosts] = useState([]);
//   const [message, setMessage] = useState(""); // ✅ For success message

//   useEffect(() => {
//     fetchPendingPosts();
//   }, []);

//   // Fetch Pending Posts
//   const fetchPendingPosts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/posts/pending");
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   // Approve Post
//   const handleApproval = async (postId, status) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/posts/${status}/${postId}`);
//       console.log(response.data);

//       if (response.status === 200) {
//         setMessage("✅ Post successfully forwarded!"); // ✅ Show message

//         // ✅ Softly remove post by fading out
//         setPosts((prevPosts) =>
//           prevPosts.map((post) =>
//             post._id === postId ? { ...post, status: "approved" } : post
//           )
//         );

//         // Notify Post.jsx to update
//         window.dispatchEvent(new Event("postApproved"));

//         // ✅ Clear message after 2 seconds
//         setTimeout(() => setMessage(""), 2000);
//       }
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center">Posts Approval Panel</h2>

//       {/* ✅ Show success message */}
//       {message && <p className="text-green-600 text-center mt-2">{message}</p>}

//       {posts.length === 0 ? (
//         <p className="text-center mt-4">No pending posts for approval.</p>
//       ) : (
//         <div className="mt-6 space-y-4">
//           {posts.map((post) =>
//             post.status === "approved" ? null : ( // ✅ Soft removal
//               <div key={post._id} className="p-4 border rounded shadow transition-opacity duration-500">
//                 <h3 className="text-lg font-semibold">{post.title}</h3>
//                 <p className="text-gray-600">{post.description}</p>

//                 {post.image && <img src={post.image} alt="Post" className="mt-2 w-40" />}

//                 <p className="text-sm text-gray-500 mt-2">
//                   <strong>Posted by:</strong> {post.createdBy?.regNo} - {post.createdBy?.email}
//                 </p>

//                 <div className="mt-3 flex space-x-4">
//                   <button
//                     className="bg-green-600 text-white px-4 py-2 rounded"
//                     onClick={() => handleApproval(post._id, "approve")}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className="bg-red-600 text-white px-4 py-2 rounded"
//                     onClick={() => handleApproval(post._id, "reject")}
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacultyApproval;













import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyApproval = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  // Fetch Pending Posts
  const fetchPendingPosts = async () => {
    try {
      const response = await axios.get("https://alma-vu.onrender.com/api/posts/pending");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Store post status in localStorage for notifications
  const storeNotification = (postTitle, status) => {
    const notifications = JSON.parse(localStorage.getItem("postNotifications")) || [];
    
    notifications.push({ title: postTitle, status, timestamp: new Date().toISOString() });

    // Store back in localStorage
    localStorage.setItem("postNotifications", JSON.stringify(notifications));
  };

  // Approve/Reject Post
  const handleApproval = async (postId, status, postTitle) => {
    try {
      const response = await axios.post(`https://alma-vu.onrender.com/api/posts/${status}/${postId}`);

      if (response.status === 200) {
        setMessage(`✅ Post "${postTitle}" successfully ${status}d!`);
        
        // Store notification locally
        storeNotification(postTitle, status);

        // Update UI
        setPosts(posts.filter(post => post._id !== postId));

        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center">Posts Approval Panel</h2>

      {message && <p className="text-green-600 text-center mt-2">{message}</p>}

      {posts.length === 0 ? (
        <p className="text-center mt-4">No pending posts for approval.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.description}</p>

              {post.image && <img src={post.image} alt="Post" className="mt-2 w-40" />}

              <p className="text-sm text-gray-500 mt-2">
                <strong>Posted by:</strong> {post.createdBy?.regNo} - {post.createdBy?.email}
              </p>

              <div className="mt-3 flex space-x-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() => handleApproval(post._id, "approve", post.title)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => handleApproval(post._id, "reject", post.title)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyApproval;

