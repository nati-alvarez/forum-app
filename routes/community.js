const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community.js");
const authMiddleware = require("../middleware/auth");


router.get("/create", authMiddleware.protected, communityController.renderCreateCommunityPage);
router.get("/:community_name", communityController.renderCommunityPage);

module.exports = router;