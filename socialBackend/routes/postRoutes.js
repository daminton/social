// postRoutes.js

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all posts
router.get("/", (req, res) => {
  // Retrieve all posts from the database
  db.all("SELECT * FROM posts", (err, posts) => {
    if (err) {
      console.error("Error fetching posts:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(posts);
    }
  });
});

// POST create a new post
router.post("/", (req, res) => {
  const { user_id, title, content } = req.body;

  if (!user_id || !title || !content) {
    return res
      .status(400)
      .json({ error: "User ID, title, and content are required" });
  }

  // Insert the new post into the database
  db.run(
    "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
    [user_id, title, content],
    function (err) {
      if (err) {
        console.error("Error adding post:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Retrieve the added post data
        const addedPost = { post_id: this.lastID, user_id, title, content };
        res.json(addedPost);
      }
    }
  );
});

module.exports = router;
