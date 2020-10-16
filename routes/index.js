const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage");

router.get("/", homepageController.renderHomepage);

const postRoutes = require("./posts");
router.use("/posts", postRoutes);

module.exports = router;