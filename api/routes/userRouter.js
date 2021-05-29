const router = require("express").Router();
const userCtrl = require("../controllers/AdminLoginCtrl");
const userCtrl2 = require("../controllers/UsersCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//Admin Routes
router.post("/admin", userCtrl.login);
router.get("/load_admin", auth, userCtrl.loadAdmin);

//Client Routes
router.post("/login", userCtrl2.login);
router.post("/register", userCtrl2.register);
router.post("/activation", userCtrl2.activateEmail);
router.post("/google_login", userCtrl2.googleLogin);

module.exports = router;
