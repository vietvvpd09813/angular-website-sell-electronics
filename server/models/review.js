module.exports = (sequelize, DataTypes) => {
const Review = sequelize.define(
    "Review",
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1, // Đánh giá tối thiểu
          max: 5, // Đánh giá tối đa
        },
      },
      text: {
        type: DataTypes.TEXT, // Nội dung đánh giá
        allowNull: true, // Có thể để trống
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Thời gian tạo đánh giá
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products", // Tên bảng trong cơ sở dữ liệu (viết thường)
          key: "id", // Khóa chính của bảng Product
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Tên bảng trong cơ sở dữ liệu (viết thường)
          key: "id", // Khóa chính của bảng User
        },
      },
    },
    {
      timestamps: false, // Không tự động tạo createdAt và updatedAt
    }
  );

  // Định nghĩa các mối quan hệ giữa Review và các model khác
  Review.associate = function (models) {
    // Mối quan hệ với Product
    Review.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product", // Tên alias cho mối quan hệ
    });

    // Mối quan hệ với User
    Review.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user", 
    });
  };
  return Review;
};
