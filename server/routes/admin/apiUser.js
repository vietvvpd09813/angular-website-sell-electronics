
const express = require('express');
const router = express.Router()
const ApiAdminUserController = require('../../controller/user.controller')

router.get("/", ApiAdminUserController.index)
router.patch("/:id", ApiAdminUserController.update)

module.exports = router