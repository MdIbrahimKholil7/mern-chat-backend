const Notification = require('../models/notificationModel')
const ObjectId = require('mongodb').ObjectId
exports.addNotificationService = async (data) => {
    const result = await Notification.create(data)
    return result
}
exports.getNotificationService = async (id) => {
    const result = await Notification.aggregate([
        {
            $match: {
                $and: [{ receiver: id }, { isView: false }]
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $group: {
                _id: "$sender",
                total: { $sum: 1 }
            }
        },

    ])
    return result
}
exports.resetNotificationService = async (id) => {
    const result = await Notification.updateMany({ receiver: id }, { $set: { isView: true } },
        {
            returnNewDocument: true
        })
    return result
}

