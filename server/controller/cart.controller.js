const {
  createCart,
  getAllCarts,
  getCart,
  updateCart,
  deleteCart,
  deleteAllCarts
} = require("../service/cartService");
const { resErrors, resData } = require("./common/common");

class ApiCartController {
  static async index(req, res) {
    try {
      const userId = req.params.id;
      let carts = await getAllCarts(userId);
      let message = "Get data successfully";
      resData(res, 200, message, carts);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  static async findById(req, res) {
    try {
      const { productId, userId } = req.query;

      const cart = await getCart(productId, userId);
      let message = "Get data successfully";
      res.json(cart);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  static async create(req, res) {
    console.log('req.bo',req.body);
    
    try {
      const data = req.body;
      let cart = await createCart(data);
      let message = "Get data successfully";
      resData(res, 200, message, cart);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async deleteAll(req, res) {
    try {
      const userId = req.params.userId;  // Hoặc req.body.userId nếu cần
      const deletedCarts = await deleteAllCarts(userId);  // Truyền userId vào hàm xóa giỏ hàng
      let message = `${deletedCarts} cart(s) deleted successfully`;
      resData(res, 200, message, deletedCarts);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  // newww

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleteA = await deleteCart(id);
      console.log("deleteA",deleteA);
      
      let message = "Update cart data successfully";
      resData(res, 200, message, deleteA);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  // static async update(req, res) {
  //   const { id } = req.params;
  //   const data = req.body;
  //   console.log("id controller", id);

  //   console.log("userId, cart controller", data);
  //   try {
  //     const userId = data.userId;
  //     const quantity = data.quantity;
  //     const update = await updateCart(userId, id, quantity);
  //     console.log(update);

  //     let message = "Update cart data successfully";
  //     resData(res, 200, message, update);
  //   } catch (error) {
  //     resErrors(res, 500, error.message);
  //   }
  // }
  static async update(req, res) {
    console.log('update controllerrr');
    
    const { id } = req.params;  // Lấy cả userId và productId từ params
    const { quantity } = req.body;  // Lấy quantity từ body request
    console.log('id update', id);
    console.log('quantity update', quantity);
    
    
    try {
      // Gọi hàm updateCart để cập nhật giỏ hàng của người dùng với số lượng mới
      const update = await updateCart({id, quantity});
      console.log(update);
  
      let message = "Update cart data successfully";
      resData(res, 200, message, update);  // Gửi kết quả cập nhật
    } catch (error) {
      resErrors(res, 500, error.message);  // Xử lý lỗi nếu có
    }
  }
  
}
module.exports = ApiCartController;
