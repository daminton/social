// PostsList.jsx

import React, { useEffect, useState } from "react";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts from the backend when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        alert("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
