module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
      "Review",
      {
       
        text: {
          type: DataTypes.TEXT,
          allowNull: true, 
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "products", 
            key: "id", 
          },
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
  
    Review.associate = function (models) {
      Review.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product", 
      });
  
      Review.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", 
      });
    };
    return Review;
  };