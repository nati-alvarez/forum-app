const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

router.get("/", postsController.getAll);

module.exports = router;