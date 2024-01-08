const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.getAllPosts);

// POST create a new post
router.post("/", postController.createPost);

module.exports = router;
