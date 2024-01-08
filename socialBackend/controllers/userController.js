// controllers/userController.js

const db = require("../config/db");

// ... other controller methods

// Controller method to create a new user
exports.createUser = (req, res) => {
  const { username, email, password } = req.body;

  // Check if required fields are present
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  // Insert the new user into the database
  db.run(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Return the newly created user details
      res.json({ user_id: this.lastID, username, email });
    }
  );
};
