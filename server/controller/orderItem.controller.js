const { where } = require("sequelize");
const { resErrors, resData } = require("./common/common");
const db = require("../models/index");
const { createOrderItem } = require("../service/orderItemService");

class ApiOrderItemController {
  static async index(req, res) {
    try {
      let products = await db.Product.findAll();
      let message = "Get data successfully";
      resData(res, 200, message, products);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    try {
      const orderItem = await db.OrderItem.findByPk(id);
      if (orderItem) {
        return res.status(200).json({
          success: true,
          message: "Order item found",
          data: orderItem,
        });
      }
      return res.status(404).json({
        success: false,
        message: "Order item not found",
      });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async create(req, res) {
    const datas = req.body.body; // Kiểm tra cấu trúc dữ liệu gửi từ client
    console.log("d,atas item", datas);

    try {
      // Nếu dữ liệu gửi đến không chứa orderId, trả về lỗi
      const orderId = datas[0].orderId


      // Lặp qua từng sản phẩm trong cart và kiểm tra giá trị hợp lệ
      datas.forEach((item) => {
        const { price } = item;
        const { productId, quantity } = item;
        console.log("productId, price, quantity", productId, price, quantity);

        if (productId && price && quantity) {
          // Kiểm tra xem các trường có giá trị hợp lệ không
          createOrderItem(
            {
              productId: productId,
              price: price,
              quantity: quantity,
            },
            orderId
          );
        }
      });
      // console.log("datassssss",datas);

      // Nếu không có item nào được cung cấp, trả về lỗi
      if (!items || Object.keys(items).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No items provided",
        });
      }

      // Lặp qua từng item và gọi createOrderItem để tạo OrderItem
      await Promise.all(
        Object.values(items).map((item) => {
          if (!item.productId || !item.quantity || !item.price) {
            throw new Error("Missing required fields in item");
          }
          return createOrderItem(item, orderId);
        })
      );

      return res.status(201).json({
        success: true,
        message: "Order items created successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order items",
        error: error.message,
      });
    }
  }
}

module.exports = ApiOrderItemController;

// angularr
