const express = require('express');
const router = express.Router()
const notification = require('../controller/notificationController')

router.post('/', notification.addNotification)
router.get('/:id', notification.getNotifications)
router.get('/update/:id', notification.resetAllNotifications)

module.exports = router


