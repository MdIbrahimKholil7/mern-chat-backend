const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
    {
        sender: {
            type: String,
            required: true
        },
        receiver: {
            type: String,
            required: true
        },
        isView: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Notification = mongoose.model("notification", notificationSchema)
module.exports = Notification;

