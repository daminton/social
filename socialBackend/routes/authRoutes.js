// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Check if the user exists in the database
    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Assuming authentication is successful, you can generate a token here
    // For simplicity, this example sends a dummy token
    const token = "dummyToken";

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper function to get a user by email
const getUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = router;
