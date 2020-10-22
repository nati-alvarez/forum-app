const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage");

router.get("/", homepageController.renderHomepage);

const authRoutes = require("./auth");
const postRoutes = require("./posts");
const communityRouter = require("./community");

router.use("/", authRoutes);
router.use("/posts", postRoutes);
router.use("/community", communityRouter);

module.exports = router;