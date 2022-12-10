const mongoose = require('mongoose');
const messageMode = require('../models/messageModel')
const Message = new mongoose.model("Message", messageMode)

const messageController = {
    addMessage: async (req, res) => {
        try {
            console.log(req.decoded)
            console.log(req.body)
            const { receiverId, message } = req.body
            const result = await Message.create({
                sender: req.decoded.id,
                receiver:receiverId,
                message,

            })
            console.log(result)
            if (result?._id) {
                res.send({
                    status: true,
                    message: "Success"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = messageController