const { where } = require("sequelize");
const { resErrors, resData } = require("../common/common");
const db = require("../../models/index");


class ApiAdminCategoryController {
  static async index(req, res) {
    try {
      let categories = await db.Category.findAll();
      let message = "Get data successfully";
      resData(res, 200, message, categories);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}
module.exports = ApiAdminCategoryController;
