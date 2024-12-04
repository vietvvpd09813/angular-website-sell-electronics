const { where } = require("sequelize");
const { resErrors, resData } = require("../common/common");
const db = require("../../models/index");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const salt = bcrypt.genSaltSync(10);

class ApiAdminUserController {
  static async index(req, res) {
    try {
      let users = await db.User.findAll();
      const message = "Get data successfully";
      resData(res, 200, message, users);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async update(req, res) {
    try {
      const { isActive, id } = req.body;
      await db.User.update({ isActive }, { where: { id } });

      const message = "Update is successfully";
      resData(res, 201, message);
    } catch (error) {
      console.error("Error update user:", error);
      resErrors(res, 500, error.message || "Internal Server Error");
    }
  }
}
module.exports = ApiAdminUserController;
