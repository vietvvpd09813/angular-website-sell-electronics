module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  // Định nghĩa các mối quan hệ giữa Category và các model khác
  Category.associate = function (models) {
    // Mối quan hệ với Product
    Category.hasMany(models.Product, {
      foreignKey: "categoryId", // Khóa ngoại trong bảng Product
      as: "products", // Tên alias cho mối quan hệ
    });
  };
  return Category;
};
