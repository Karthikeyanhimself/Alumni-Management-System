import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ApprovedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://alma-vu.onrender.com/api/posts/approved");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching approved posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Approved Posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No approved posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post._id}
                className="bg-white shadow-lg rounded-lg p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Post Header */}
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <span className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full">
                    {post.status}
                  </span>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-4">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-48 object-cover rounded-md shadow-sm"
                    />
                  </div>
                )}

                {/* Post Description */}
                <p className="text-gray-700">{post.description}</p>

                {/* Posted By */}
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Posted By:</span> {post.createdBy.email} 
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Reg No:</span> {post.createdBy.regNo}
                  </p>
                </div>

                {/* Post Date */}
                <p className="text-right text-gray-500 text-xs mt-3">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedPosts;
