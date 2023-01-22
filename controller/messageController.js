const mongoose = require('mongoose');
const messageMode = require('../models/messageModel')
const Message = new mongoose.model("Message", messageMode)

const messageController = {
    addMessage: async (req, res) => {
        try {

            const { receiverId, message } = req.body
            const result = await Message.create({
                sender: req.decoded.id,
                receiver: receiverId,
                message,

                })
            
            if (result?._id) {
                res.send({
                    status: true,
                    message: "Success"
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    getMessages: async (req, res) => {
        try {
            const { friendId } = req.params
            const ownId = req.decoded.id

            const result = await Message.find()
            const filterResult = result.filter(msg => (msg.sender === ownId && msg.receiver === friendId) || (msg.receiver === ownId && msg.sender === friendId))
            
            res.send({
                status: true,
                message: "Success",
                data: filterResult
            })
            // console.log(result)
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "Internal Server Error"
            })
           
        }
    }
}

module.exports = messageController



