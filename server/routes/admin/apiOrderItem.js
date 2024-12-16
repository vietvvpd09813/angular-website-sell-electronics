
const express = require('express');
const router = express.Router()
const ApiOrderItemController = require('../../controller/orderItem.controller')
router.post("/",ApiOrderItemController.create)
module.exports = router


