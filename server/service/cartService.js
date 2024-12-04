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

const updateCart = async (userId, id,quantity) => {
    try {
        const updateCart = await Cart.update(
            { quantity }, // Giá trị cần cập nhật
            { where: { userId, id } } // Điều kiện
          );        
          return updateCart;
    } catch (error) {
        console.error("Error update cart:", error);
      throw error;
    }
}

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
}