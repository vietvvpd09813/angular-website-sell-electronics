const { Cart, Product } = require("../models")

const createCart = async (data) => {
    try {
      const existingCart = await Cart.findOne({
        where: {
          userId: data.userId,
          productId: data.productId
        },
      });
  
      if (existingCart) {
        existingCart.quantity += data.quantity; 
        await existingCart.save(); // Lưu thay đổi
        return existingCart; 
      } else {
        const cart = await Cart.create(data);
        return cart;
      }
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  };

const getAllCarts = async (userId) => {
    try {
      const carts = await Cart.findAll({
        where: { userId },
        include: {
          model: Product,         // Chỉ định mô hình Product
          as: 'product',   // Đặt alias cho mối quan hệ
          required: true,          // Inner join để chỉ lấy Cart có Product
          attributes: ['id', 'name', 'price', 'image1'],  // Chọn các trường từ bảng Product
        }
      });
      
              return carts;
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
}

const getCart = async (productId, userId) => {
    
    try {
      const cart = await Cart.findOne({
        where: {
          userId,
          productId,
        },
        include: [
          {
            model: Product,
            as: 'product',// Lấy thông tin sản phẩm
          }
        ],
      });
  
      return cart;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  };

const updateCart = async ( {id,quantity}) => {
    try {
        const updateCart = await Cart.update(
            { quantity }, // Giá trị cần cập nhật
            { where: { id } } // Điều kiện
          );        
          return updateCart;
    } catch (error) {
        console.error("Error update cart:", error);
      throw error;
    }
}
const deleteAllCarts = async (userId) => {
  try {
    // Xóa tất cả dữ liệu trong bảng Cart của người dùng
    const deletedCarts = await Cart.destroy({
      where: { userId }, // Chỉ xóa giỏ hàng của người dùng có userId
    });

    // Log số lượng giỏ hàng đã xóa
    console.log("deletedCarts", deletedCarts);

    // Trả về số lượng giỏ hàng đã xóa
    return deletedCarts;
  } catch (error) {
    console.error("Error deleting all carts:", error);
    throw error;  // Ném lỗi ra ngoài để có thể xử lý trong hàm gọi
  }
};

const deleteCart = async (id) => {
    try {
        const deleteCart = await Cart.destroy({where: {id}})
        return deleteCart;
    } catch (error) {
        console.error("Error update cart:", error);
        throw error;
    }
}

module.exports = {
    createCart,
    getAllCarts,
    getCart,
    updateCart,
    deleteCart,
    deleteAllCarts
}