const { resErrors, resData } = require("./common/common");
const { getAllProduct, createProduct, deleteProduct, updateProduct, getProductDetail, getbycategoryId } = require("../service/productService");

class ApiProductController {
  // Lấy tất cả sản phẩm
  static async index(req, res) {
    try {
      let products = await getAllProduct();
      let message = "Get data successfully";
      resData(res, 200, message, products);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async findcategoryId(req, res) {
    try {
      const categoryId = req.params.id
      let products = await getbycategoryId(categoryId)
      let message = "Get data successfully";
      resData(res, 200, message, products);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  // Lấy chi tiết sản phẩm theo ID (findById)
  static async findById(req, res) {
    const { id } = req.params; // Lấy id từ params trong URL
    console.log('kgjgjghj',req.params);
    
    try {
      const product = await getProductDetail(id); // Gọi service để lấy chi tiết sản phẩm

      // Nếu không có sản phẩm, ném lỗi
      if (!product) {
        return resErrors(res, 404, "Sản phẩm không tồn tại");
      }

      let message = "Get product detail successfully";
      resData(res, 200, message, product);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  // Tạo mới sản phẩm
  static async create(req, res) {
    try {
      const data = req.body; // Lấy dữ liệu sản phẩm từ request body
      const product = await createProduct(data);
      let message = "Create product successfully";
      resData(res, 200, message, product);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  // Xóa sản phẩm
  static async delete(req, res) {
    const { id } = req.params;
    try {
      await deleteProduct(id);
      let message = "Delete product successfully";
      resData(res, 200, message);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  // Cập nhật sản phẩm
  static async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      await updateProduct({ data, id });
      let message = "Update product successfully";
      resData(res, 200, message);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}

module.exports = ApiProductController;
