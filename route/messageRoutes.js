const express = require('express');
const messageController = require('../controller/messageController');
const { verifyJwt } = require('../middleware/auth');
const router = express.Router()


router.post('/addMessage', verifyJwt, messageController.addMessage)

module.exports = router
