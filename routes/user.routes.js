const router = require('express').Router();
const authController = require('../controllers/Auth.Controllers.js');
const userController = require('../controllers/user.controller.js');

// auth
router.post("/register", authController.signUp);
router.get('/logout', authController.logout);






module.exports = router; 