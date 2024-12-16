
const express = require('express');
const router = express.Router()
const ApiReviewController = require("../../controller/comment.controller")
router.get("/:productId", ApiReviewController.index)
router.get("/", ApiReviewController.index1)
router.post("/", ApiReviewController.create)
router.delete("/:id",ApiReviewController.delete)
router.put("/:id", ApiReviewController.update)
module.exports = router