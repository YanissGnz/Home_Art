const router = require("express").Router();
const userCtrl = require("../controllers/AdminCtrl");
const userCtrl2 = require("../controllers/UsersCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//Admin Routes
router.post("/admin", userCtrl.login);
router.get("/load_admin", auth, userCtrl.loadAdmin);
router.get("/get_users", auth, userCtrl.getUsers);
router.delete("/delete_user/:user_Id", auth, userCtrl.deleteUser);

//Client Routes
router.post("/login", userCtrl2.login);
router.get("/load_User", auth, userCtrl2.loadUser);
router.post("/Recover_Password", userCtrl2.forgotPassword);
router.post("/Reset_Password", auth, userCtrl2.resetPassword);
router.post("/register", userCtrl2.register);
router.post("/activation", userCtrl2.activateEmail);
router.post("/google_login", userCtrl2.googleLogin);
router.post("/add_to_favorite/:product_Id", auth, userCtrl2.addToFavorite);
router.post(
  "/remove_from_favorite/:product_Id",
  auth,
  userCtrl2.removeFromFavorite
);
router.post("/add_to_cart", auth, userCtrl2.addToCart);
router.post("/reduce_quantity", auth, userCtrl2.reduceQuantity);
router.post("/remove_item_from_cart", auth, userCtrl2.removeItem);
router.put("/edit_profile/:user_id", auth, userCtrl2.editProfile);

module.exports = router;
