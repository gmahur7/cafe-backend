const express=require('express')
const router=express.Router()
const {signup,login} = require('../Controller/UserControllers')

router.route('/').post(signup)
router.post('/login',login)

module.exports = router