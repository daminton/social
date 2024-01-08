const db = require("../config/db"); // Assuming you've configured your db.js

// Controller method to get all posts
exports.getAllPosts = (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
};

// Controller method to create a new post
exports.createPost = (req, res) => {
  const { user_id, content } = req.body;

  // Check if required fields are present
  if (!user_id || !content) {
    return res.status(400).json({ error: "User ID and content are required" });
  }

  // Insert the new post into the database
  db.run(
    "INSERT INTO posts (user_id, content) VALUES (?, ?)",
    [user_id, content],
    function (err) {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ post_id: this.lastID, user_id, content });
      }
    }
  );
};
