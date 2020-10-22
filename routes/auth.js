const express = require("express");
const router = express.Router();
const path = require("path");
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
const authController = require("../controllers/auth");


router.get("/login",  authController.renderLoginPage);
router.post("/login", authController.login);

router.get("/signup",  authController.renderSignupPage)
router.post("/signup", upload.single("pfp"), authController.signup);

module.exports = router;