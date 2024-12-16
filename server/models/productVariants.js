module.exports = (sequelize, DataTypes) => {
const ProductVariant = sequelize.define(
    "ProductVariant",
    {
      color: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING(50),
      },
      image: {
        type: DataTypes.STRING(255),
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      // productId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "products", // Tên bảng trong cơ sở dữ liệu
      //     key: "id", // Khóa chính của bảng Product
      //   },
      // },
    },
    {
      timestamps: true,
      paranoid: true, // Hỗ trợ xóa mềm
    }
  );

  // Định nghĩa các mối quan hệ giữa ProductVariant và các model khác
  ProductVariant.associate = function (models) {
    // Mối quan hệ với Product
    ProductVariant.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product", // Tên alias cho mối quan hệ
    });
  };

  return ProductVariant;
};
