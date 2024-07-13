const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getSellerProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(authorizedRoles("admin"), getAdminProducts);
router
  .route("/seller/products/:id")
  .get(authorizedRoles("seller"), getSellerProducts);

router
  .route("/admin/product/new")
  .post(authorizedRoles("admin"), createProduct);
router
  .route("/seller/product/new")
  .post(authorizedRoles("seller"), createProduct);

router
  .route("/admin/product/:id")
  .put(authorizedRoles("admin"), updateProduct)
  .delete(authorizedRoles("admin"), deleteProduct);
router
  .route("/seller/product/:id")
  .put(authorizedRoles("seller"), updateProduct)
  .delete(authorizedRoles("seller"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(createProductReview);

router.route("/reviews").get(getProductReviews).delete(deleteReview);

module.exports = router;
