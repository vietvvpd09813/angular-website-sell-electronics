
const express = require('express');
const router = express.Router()
const ApiCartController = require("../../controller/cart.controller")
router.get("/:id", ApiCartController.index)
router.get("/:id", ApiCartController.findById)
router.post("/", ApiCartController.create)
router.patch("/:id", ApiCartController.update)
router.delete("/:id", ApiCartController.delete)
module.exports = router