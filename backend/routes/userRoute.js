const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  scheduleMeet,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(authorizedRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(authorizedRoles("admin"), getSingleUser)
  .put(authorizedRoles("admin"), updateUserRole)
  .delete(authorizedRoles("admin"), deleteUser);

router.route("/consultation/schedule").post(isAuthenticatedUser, scheduleMeet);

module.exports = router;
