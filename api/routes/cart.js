const express = require("express");
const auth = require("../middleware/auth");
const {addToCart} = require("../controllers/cart");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  auth,
  addToCart
);

/*const {
  addItemToCart,
  addToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart");
const auth = require("../middleware/auth");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  auth,
  addItemToCart
);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post("/user/getCartItems", auth, getCartItems);
//new update
router.post(
  "/user/cart/removeItem",
  auth,
  removeCartItems
);
*/
module.exports = router;