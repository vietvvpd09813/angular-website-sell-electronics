
const express = require('express');
const router = express.Router()
const ApiCategoryController = require('../../controller/category.controller')

router.get("/", ApiCategoryController.index)
router.get("/:id", ApiCategoryController.findById)
router.post("/", ApiCategoryController.create)
router.put("/:id", ApiCategoryController.update)
router.delete("/:id", ApiCategoryController.delete)

module.exports = router