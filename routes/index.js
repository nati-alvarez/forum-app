const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage");

router.get("/", homepageController.renderHomepage);

const authRoutes = require("./auth");
const postRoutes = require("./posts");

router.use("/", authRoutes);
router.use("/posts", postRoutes);

module.exports = router;