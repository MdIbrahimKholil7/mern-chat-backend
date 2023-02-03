const mongoose = require('mongoose');
const { addNotificationService, getNotificationService, resetNotificationService } = require("../services/notificationServices")
const userSchema = require('../models/userModel');
const User = new mongoose.model('User', userSchema)
class Notification {
    static addNotification = async (req, res) => {
        try {
            const result = await addNotificationService(req.body)
            res.json({
                message: "Success",
                result
            })

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static getNotifications = async (req, res) => {
        try {

            const data = await getNotificationService(req.params.id)
            const result = []
            let total = 0

            for (let d of data) {
                const userResult = await User.findById(d._id)
                result.push({ ...d, name: userResult.name })
                total += d.total
            }

            res.status(200).json({
                message: 'Success',
                result,
                totalNotification: total
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static resetAllNotifications = async (req, res) => {
        try {

            const result = await resetNotificationService(req.params.id)
            res.status(200).json({
                result: result,
                message: "Success"
            })
           
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}
module.exports = Notification
