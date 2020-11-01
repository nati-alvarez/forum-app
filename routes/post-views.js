const express = require("express");
const router = express.Router();
const PostViewController = require("../controllers/post-views");

router.post("/", PostViewController.createView);

module.exports = router;