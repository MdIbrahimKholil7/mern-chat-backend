const express = require('express');
const userController = require('../controller/userController');
const { verifyJwt } = require('../middleware/auth');

const router = express.Router()

router.post('/post', userController.signUp)
router.post('/login', userController.login)
router.get('/getUser', verifyJwt, userController.getUserInformation)
router.get('/getAllUser', verifyJwt, userController.getAllUser)

module.exports = router
