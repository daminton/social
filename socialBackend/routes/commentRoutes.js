const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// GET all comments
router.get("/", commentController.getAllComments);

// POST create a new comment
router.post("/", commentController.createComment);

module.exports = router;
