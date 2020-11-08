const express = require("express");
const router = express.Router();
const PostVotesController = require("../controllers/post-votes");

router.post("/", PostVotesController.vote);

module.exports = router;