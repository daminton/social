const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

// GET all likes
router.get("/", likeController.getAllLikes);

// POST create a new like
router.post("/", likeController.createLike);

module.exports = router;
