
const express = require('express');
const router = express.Router()
const UserAdminRoute = require("./apiUser")
const CategoryAdminRoute = require("./apiCategory")
const ProductAdminRoute = require("./apiProduct")
const CartAdminRoute = require("./apiCart")
const orderAdminRoute = require("./apiOrder")
const orderItemRoute = require("./apiOrderItem")
const commentRoute = require("./apiComment")

router.use("/users", UserAdminRoute)
router.use("/categories", CategoryAdminRoute)
router.use("/products", ProductAdminRoute)
router.use("/cart", CartAdminRoute)
router.use("/order", orderAdminRoute)
router.use("/orderItem", orderItemRoute)
router.use("/review",commentRoute)


module.exports = router
