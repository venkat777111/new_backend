const express = require("express");
const { authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getSellerOrders,
  updateSellerOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(newOrder);

router.route("/order/:id").get(getSingleOrder);

router.route("/orders/me").get(myOrders);

router.route("/admin/orders").get(authorizedRoles("admin"), getAllOrders);
router.route("/seller/orders").get(authorizedRoles("seller"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(authorizedRoles("admin"), updateOrder)
  .delete(authorizedRoles("admin"), deleteOrder);
router
  .route("/seller/order/:id")
  .put(authorizedRoles("seller"), updateSellerOrder)
  .delete(authorizedRoles("seller"), deleteOrder);

module.exports = router;
