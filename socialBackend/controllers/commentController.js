const db = require("../config/db"); // Assuming you've configured your db.js

// Controller method to get all comments
exports.getAllComments = (req, res) => {
  db.all("SELECT * FROM comments", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
};

// Controller method to create a new comment
exports.createComment = (req, res) => {
  const { user_id, post_id, content } = req.body;

  // Check if required fields are present
  if (!user_id || !post_id || !content) {
    return res
      .status(400)
      .json({ error: "User ID, post ID, and content are required" });
  }

  // Insert the new comment into the database
  db.run(
    "INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)",
    [user_id, post_id, content],
    function (err) {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ comment_id: this.lastID, user_id, post_id, content });
      }
    }
  );
};
