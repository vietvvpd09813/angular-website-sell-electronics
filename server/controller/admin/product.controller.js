const { where } = require("sequelize");
const { resErrors, resData } = require("../common/common");
const db = require("../../models/index");


class ApiAdminProductController {
  static async index(req, res) {
    try {
      let products = await db.Product.findAll();
      let message = "Get data successfully";
      resData(res, 200, message, products);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}
module.exports = ApiAdminProductController;
