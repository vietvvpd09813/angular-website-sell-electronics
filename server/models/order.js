module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      status: {
        type: DataTypes.ENUM(
          "Chờ xác nhận",
          "Đã xác nhận",
          "Đang vận chuyển",
          "Đang giao hàng",
          "Đã giao",
          "Đã hoàn thành",
          "Đã hủy đơn"
        ),
        defaultValue: "Chờ xác nhận",
      },
      fullname: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 0),
      },
      orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId",
      as: "orderItems",
    });
  };

  return Order;
};
