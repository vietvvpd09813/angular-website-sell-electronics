const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

// Thiết lập kết nối cơ sở dữ liệu
const sequelize = new Sequelize("angular98", "root", "Clmmtt123", {
  host: "localhost",
  dialect: "mysql",
});

// Kiểm tra kết nối
sequelize
  .authenticate()
  .then(() => console.log("Kết nối thành công!"))
  .catch((e) => console.error("Kết nối thất bại:", e));

// Đối tượng để lưu tất cả các model
const models = {};

// Tự động đọc tất cả file trong thư mục `models`, trừ `index.js`
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  });

// Thiết lập các mối quan hệ (associate) giữa các model
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Xuất các model và kết nối sequelize
module.exports = {
  sequelize, // Kết nối Sequelize
  Sequelize, // Sequelize library
  ...models, // Các model
};
