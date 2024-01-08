const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");

// Function to run database migrations
const runMigrations = () => {
  const fs = require("fs");
  const path = require("path");
  const migrationsPath = path.join(__dirname, "./migrations");

  fs.readdirSync(migrationsPath).forEach((filename) => {
    const migrationPath = path.join(migrationsPath, filename);
    const migrationScript = fs.readFileSync(migrationPath, "utf-8");
    db.run(migrationScript, (err) => {
      if (err) {
        console.error(`Error executing migration ${filename}:`, err.message);
      } else {
        console.log(`Executed migration ${filename}`);
      }
    });
  });
};

// Run migrations during the application setup
runMigrations();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define your routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
