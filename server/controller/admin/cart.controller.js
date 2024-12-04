const { where } = require("sequelize");
const { resErrors, resData } = require("./common/common");
const db = require("../models/index");


class ApiCartController {
  static async index(req, res) {
    try {
      let products = await db.Product.findAll();
      let message = "Get data successfully";
      resData(res, 200, message, products);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async delete(req, res) {
    const {id} = req.params;
    
  }

  static async update(req, res) {
    
  }
}
module.exports = ApiCartController;
