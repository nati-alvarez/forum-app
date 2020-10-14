const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage");

router.get("/", homepageController.renderHomepage);

module.exports = router;