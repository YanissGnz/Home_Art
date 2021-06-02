const router = require("express").Router();
const userCtrl = require("../controllers/AdminLoginCtrl");
const userCtrl2 = require("../controllers/UsersCtrl");
const auth = require("../middleware/auth");
// Admin Routes
router.post("/admin", userCtrl.login);
router.get("/load_admin", auth, userCtrl.loadAdmin);

//Client Routes
router.post("/login", userCtrl2.login);
router.get("/load_User", auth, userCtrl2.loadUser);
router.post('/Recover_Password', userCtrl2.forgotPassword)
router.post('/Reset_Password',  auth, userCtrl2.resetPassword)
router.post("/register", userCtrl2.register);
router.post("/activation", userCtrl2.activateEmail);
router.post("/google_login", userCtrl2.googleLogin);

module.exports = router;
