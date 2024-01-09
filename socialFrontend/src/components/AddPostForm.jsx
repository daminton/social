import React, { useState } from "react";

const AddPostForm = ({ onAddPost, userId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = async (e) => {
    e.preventDefault();

    if (!userId || !title || !content) {
      alert("User ID, title, and content are required");
      return;
    }

    try {
      console.log("Sending POST request to add a new post...");

      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any authentication headers or tokens if needed
        },
        body: JSON.stringify({ user_id: userId, title, content }), // Include user_id
      });

      console.log("Server response:", response);

      if (!response.ok) {
        throw new Error("Failed to add post");
      }

      const addedPost = await response.json();

      console.log("Added post:", addedPost);

      onAddPost(addedPost);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding post:", error.message);
      alert("Failed to add post");
    }
  };

  return (
    <div>
      <h2>Add a Post</h2>
      <form onSubmit={handleAddPost}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPostForm;
