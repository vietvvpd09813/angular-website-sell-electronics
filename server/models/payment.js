module.exports = (sequelize, DataTypes) => {
const Payment = sequelize.define(
    "Payment",
    {
      paymentMethod: {
        type: DataTypes.ENUM(
          "creditCard",
          "paypal",
          "bankTransfer",
          "cashOnDelivery"
        ),
        allowNull: false, // Không được null
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false, // Không được null
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
        defaultValue: "pending", // Giá trị mặc định
      },
      paymentDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Thời gian thanh toán
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orders", // Tên bảng trong cơ sở dữ liệu (viết thường)
          key: "id", // Khóa chính của bảng Order
        },
      },
    },
    {
      timestamps: false, // Không tự động tạo createdAt và updatedAt
    }
  );

  // Định nghĩa các mối quan hệ giữa Payment và các model khác
  Payment.associate = function (models) {
    // Mối quan hệ với Order
    Payment.belongsTo(models.Order, {
      foreignKey: "orderId",
      as: "order", // Tên alias cho mối quan hệ
    });
  };

  return Payment;
};

