module.exports = (sequelize, DataTypes) => {
const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        // allowNull: false,
        defaultValue: '',

      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
    }
  );

  // Định nghĩa các mối quan hệ giữa User và các model khác
  User.associate = function (models) {
    // Mối quan hệ với Address
    User.hasMany(models.Address, {
      foreignKey: "userId",
      as: "addresses", // Tên alias cho mối quan hệ
    });

    // Mối quan hệ với Order
    User.hasMany(models.Order, {
      foreignKey: "userId",
      as: "orders", // Tên alias cho mối quan hệ
    });

    // Mối quan hệ với Review
    User.hasMany(models.Review, {
      foreignKey: "userId",
      as: "reviews", // Tên alias cho mối quan hệ
    });
  };
  return User;
};
