const { where } = require("sequelize");
const { resErrors, resData } = require("./common/common");
const {getAllUser, updateStatusUser} = require("../service/userService");

class ApiUserController {
  static async index(req, res) {
    try {
      let users = await getAllUser();
      
      const message = "Get data successfully";
      resData(res, 200, message, users);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  
  static async update(req, res) {
    try {
      const {id} = req.params;
      let { isActive } = req.body;
      console.log(isActive);
      console.log(id);
      
      
      
      const data = await updateStatusUser(id, isActive);
      console.log('data', data);
      
      
      const message = "Update is successfully";
      resData(res, 201, message);
    } catch (error) {
      console.error("Error update user:", error);
      resErrors(res, 500, error.message || "Internal Server Error");
    }
  }
}
module.exports = ApiUserController;
