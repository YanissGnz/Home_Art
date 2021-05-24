const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/admin', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)


router.get('/info', auth, userCtrl.getUserInfo)

router.get('/all_info', auth, authAdmin, userCtrl.getUsersAllInfo)


module.exports = router