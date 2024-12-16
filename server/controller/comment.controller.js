const { resErrors, resData } = require("./common/common");
const {
  createReview,
  getAllReviews,
  updateReview,
  getAllComment,
  deleteComment,
} = require("../service/commentService");

class ApiReviewController {
  static async index(req, res) {
    try {
      const { productId } = req.params;
      let reviews = await getAllReviews(productId);
      console.log("reviews", reviews);
      let message = "Get data successfully";
      resData(res, 200, message, reviews);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async create(req, res) {
    try {
      const { productId, userId, rating, text } = req.body;
      const review = await createReview({ productId, userId, rating, text });
      let message = "create review successfully";
      const status = 200;
      return res.json({ status, message, review });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async index1(req, res) {
    try {
      let comment = await getAllComment();
      let message = "Get data successfully";
      resData(res, 200, message, comment);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const update = await updateReview({ id, text });

      res.json(update);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async delete(req, res) {
    const { id } = req.params;
    try {
      await deleteComment(id);  // Xóa bình luận
      // Lấy lại tất cả bình luận sau khi xóa
      let comments = await getAllComment();
      let message = "Delete comment successfully";
      resData(res, 200, message, comments);  // Trả về mảng bình luận mới
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  
}
module.exports = ApiReviewController;
