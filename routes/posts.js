const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

router.get("/", postsController.getAll);

router.get("/:post_id", postsController.renderPost);

module.exports = router;