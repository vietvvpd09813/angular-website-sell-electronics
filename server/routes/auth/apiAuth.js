
const express = require('express');
const router = express.Router()
const ApiAuthController = require('../../controller/auth/auth.controller')
const authenticateToken = require("../../middleware/authenToken")

router.post("/register", ApiAuthController.create)
router.post("/login", ApiAuthController.login)
router.get("/fetchUserData", authenticateToken, ApiAuthController.fetchData)
router.get("/logout", ApiAuthController.logout)
router.post("/refresh-token", ApiAuthController.newToken)

module.exports = router