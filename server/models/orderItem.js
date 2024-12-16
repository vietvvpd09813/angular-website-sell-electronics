const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
      "OrderItem",
      {
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10,0),
        },
        orderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "orders", // Tên bảng trong cơ sở dữ liệu (viết thường)
            key: "id", // Khóa chính của bảng Order
          },
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "products", // Tên bảng trong cơ sở dữ liệu (viết thường)
            key: "id", // Khóa chính của bảng Product
          },
        },
      },
      {
        timestamps: true, // Tự động tạo createdAt và updatedAt
      }
    );
  
    // Định nghĩa các mối quan hệ giữa OrderItem và các model khác
    OrderItem.associate = function (models) {
      // Mối quan hệ với Order
      OrderItem.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order", // Tên alias cho mối quan hệ
      });
  
      // Mối quan hệ với Product
      OrderItem.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product", // Tên alias cho mối quan hệ
      });
    };
  
    return OrderItem;
  };