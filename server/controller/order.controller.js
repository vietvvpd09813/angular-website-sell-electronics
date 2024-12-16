const { resErrors, resData } = require("./common/common");
const { updateOrderStatus, createOrder, getOrders, getAllOrderNew } = require("../service/orderService");

class ApiOrderController {
  // Lấy tất cả đơn hàng của người dùng
  static async index(req, res) {
    try {
      const { userid } = req.params;
      console.log("userid controllercsksjsdh", userid);

      let orders = await getOrders(userid);

      res.json({ orders });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  // Lấy tất cả đơn hàng
  static async index1(req, res) {
    try {
      let orders = await getAllOrderNew();
      console.log("orders",orders);
      
      res.json({ orders });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  // Tạo mới đơn hàng
  static async create(req, res) {
    const data = req.body;
    console.log("new data",data);


    try {
      const userId = Number(data.userId);
      const address = data.address;
      const totalPrice = Number(data.totalAmount);
      const fullname = data.fullName;
      const phone = data.phoneNumber;
      const newData = { userId, address, totalPrice, fullname, phone };

      const order = await createOrder(newData);
      let message = "Tạo đơn hàng thành công";
      const status = 200;
      return res.json({ status, message, order });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  static async updateStatus(req, res) {
    const { orderId } = req.params; // Lấy orderId từ params
    const { status } = req.body; // Lấy status từ body
  
    
    try {
      // Gọi service để cập nhật trạng thái đơn hàng
      const result = await updateOrderStatus(orderId, status);

      // Trả về thông báo thành công
      return res.json({ status: 200, message: result.message });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}

module.exports = ApiOrderController;
