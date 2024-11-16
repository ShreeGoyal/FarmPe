const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.js");
const WrapAsync = require("../utils/WrapAsync.js");

router.route("/login")
    .post(passport.authenticate('local' ,{failureRedirect: '/login/failed'}), WrapAsync(authController.Login));

router.route("/signup")
    .post(WrapAsync(authController.signup));

router.route("/login/failed")
    .get(authController.LoginFailed);

router.route("/logout")
    .get(WrapAsync(authController.Logout));

module.exports = router;