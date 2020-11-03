const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community.js");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({storage});


router.get("/create", authMiddleware.protected, communityController.renderCreateCommunityPage);
router.post("/create", [authMiddleware.protected, upload.fields([{name: "banner"}, {name: "icon"}])], communityController.createCommunity);
router.get("/:community_name", communityController.renderCommunityPage);

module.exports = router;