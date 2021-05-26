const router = require('express').Router()
const userCtrl = require('../controllers/AdminLoginCtrl')
const userCtrl2 = require('../controllers/UsersCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/admin', userCtrl.login)
router.post('/login', userCtrl2.login)

router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/register', userCtrl2.register)

router.post('/activation', userCtrl2.activateEmail)

router.get('/info', auth, userCtrl2.getUserInfo2)
router.get('/info', auth, userCtrl.getUserInfo)
router.get('/all_info', auth, authAdmin, userCtrl.getUsersAllInfo)

router.post('/google_login', userCtrl2.googleLogin)


module.exports = router