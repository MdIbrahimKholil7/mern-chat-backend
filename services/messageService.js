const mongoose = require('mongoose');
const messageMode = require('../models/messageModel')
const Message = new mongoose.model("Message", messageMode)


exports.getLastMessage = async (myId, friendId) => {
    const result = await Message.findOne({
        $or: [
            {
                $and: [
                    { sender: myId },
                    { receiver: friendId }
                ]
            },
            {
                $and: [
                    { receiver: myId },
                    { sender: friendId }
                ]
            }


        ]
    }).sort({ updatedAt: -1 })
    return result
}



