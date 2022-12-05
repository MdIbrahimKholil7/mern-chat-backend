const express = require('express');
const userController = require('../controller/userController');

const router=express.Router()

router.post('/post',userController.signUp)

module.exports=router


