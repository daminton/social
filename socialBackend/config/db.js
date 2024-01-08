const sqlite3 = require("sqlite3");
const path = require("path");

// Resolve the path to your SQLite database file
const dbPath = path.resolve(__dirname, "database.db");

// Create a new SQLite database instance
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database");
  }
});

// Perform additional setup or configurations if needed

// Handle process termination to close the database connection
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Closed SQLite database connection");
      process.exit(0);
    }
  });
});

module.exports = db;
