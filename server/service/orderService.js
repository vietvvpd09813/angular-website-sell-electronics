const { Order, OrderItem, Product } = require("../models");

const validStatuses = [
  "Chờ xác nhận",
  "Đã xác nhận",
  "Đang vận chuyển",
  "Đang giao hàng",
  "Đã giao",
  "Đã hoàn thành",
  "Đã hủy đơn",
];

const createOrder = async (data) => {
  try {
    const order = await Order.create(data);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Lỗi khi tạo đơn hàng");
  }
};

const getAllOrderNew = async () => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: "orderItems",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
      ],
      
    });
    return orders;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw new Error("Lỗi khi lấy tất cả đơn hàng");
  }
};

const getOrders = async (userId) => {
  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: "orderItems",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
      ],
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders by userId:", error);
    throw new Error("Lỗi khi lấy đơn hàng của người dùng");
  }
};

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    if (!validStatuses.includes(newStatus)) {
      throw new Error("Trạng thái không hợp lệ");
    }

    const [updatedRows] = await Order.update(
      { status: newStatus },
      {
        where: { id: orderId },
      }
    );

    if (updatedRows === 0) {
      throw new Error("Đơn hàng không tồn tại hoặc trạng thái không thay đổi");
    }

    return { message: "Cập nhật trạng thái đơn hàng thành công" };
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error(error.message || "Lỗi khi cập nhật trạng thái đơn hàng");
  }
};

const updateOrder = async (id, data) => {
  try {
    const [updatedRows] = await Order.update(data, { where: { id } });

    if (updatedRows === 0) {
      throw new Error("Đơn hàng không tồn tại");
    }

    return { message: "Cập nhật đơn hàng thành công" };
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Lỗi khi cập nhật đơn hàng");
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrders,
  getAllOrderNew,
  updateOrderStatus,
  validStatuses,
};
