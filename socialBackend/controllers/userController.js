// controllers/userController.js

const db = require("../config/db");

// Controller method to get all users
exports.getAllUsers = (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
};

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
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ user_id: this.lastID, username, email });
      }
    }
  );
};
