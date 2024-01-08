const db = require("../config/db"); // Assuming you've configured your db.js

// Controller method to get all likes
exports.getAllLikes = (req, res) => {
  db.all("SELECT * FROM likes", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
};

// Controller method to create a new like
exports.createLike = (req, res) => {
  const { user_id, post_id } = req.body;

  // Check if required fields are present
  if (!user_id || !post_id) {
    return res.status(400).json({ error: "User ID and post ID are required" });
  }

  // Insert the new like into the database
  db.run(
    "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
    [user_id, post_id],
    function (err) {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ like_id: this.lastID, user_id, post_id });
      }
    }
  );
};
