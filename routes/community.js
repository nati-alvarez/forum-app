const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community.js");

router.get("/:community_name", communityController.renderCommunityPage);

module.exports = router;