const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const homepageController = require("../controllers/homepage");

router.get("/", authMiddleware.isAuthenticated, homepageController.renderHomepage);

const authRoutes = require("./auth");
const postRoutes = require("./posts");
const communityRouter = require("./community");
const postViewRoutes = require("./post-views");
const commentRoutes = require("./comments");
const voteRoutes = require("./post-votes");

router.use("/", authRoutes);
router.use("/posts", authMiddleware.isAuthenticated, postRoutes);
router.use("/community", authMiddleware.isAuthenticated, communityRouter);
router.use("/post-views", [authMiddleware.isAuthenticated, authMiddleware.apiProtected], postViewRoutes);
router.use("/comments", [authMiddleware.isAuthenticated, authMiddleware.apiProtected], commentRoutes);
router.use("/post-votes", [authMiddleware.isAuthenticated, authMiddleware.apiProtected], voteRoutes);

module.exports = router;