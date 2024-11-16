const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const orderController = require("../controllers/order.js");
const {isLoggedIn} = require('../middleware.js');

router.route("/")
    .post(isLoggedIn, WrapAsync(orderController.PlaceOrder));

router.route("/:PId/:TId")
    .get(isLoggedIn, WrapAsync(orderController.getPostOrder));

module.exports = router;