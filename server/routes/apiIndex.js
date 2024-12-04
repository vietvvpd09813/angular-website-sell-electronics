const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');
const authenticateToken = require("../middleware/authenToken");

const AdminRoute = require("./admin/apiAdminIndex");
const AuthRoute = require("./auth/apiAuth");
const UserRoute = require("./user/apiUser");

router.use("/admin", AdminRoute)
router.use("/auth", AuthRoute)
router.use("/user", UserRoute)


module.exports = router