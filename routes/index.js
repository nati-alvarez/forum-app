const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const homepageController = require("../controllers/homepage");

router.get("/", authMiddleware.isAuthenticated, homepageController.renderHomepage);

const authRoutes = require("./auth");
const postRoutes = require("./posts");
const communityRouter = require("./community");

router.use("/", authRoutes);
router.use("/posts", authMiddleware.isAuthenticated, postRoutes);
router.use("/community", authMiddleware.isAuthenticated, communityRouter);

module.exports = router;