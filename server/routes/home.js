const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const homeController = require("../controllers/home.js");
const {isLoggedIn} = require('../middleware.js');

router.route("/")
    .get(isLoggedIn, WrapAsync(homeController.home))
    .post(isLoggedIn, WrapAsync(homeController.newPost));

router.route("/:id")
    .delete(isLoggedIn, WrapAsync(homeController.deletePost))
    .put(isLoggedIn, WrapAsync(homeController.editPost));

router.route("/search/:value")
    .get(isLoggedIn, WrapAsync(homeController.searchPost));

module.exports = router;