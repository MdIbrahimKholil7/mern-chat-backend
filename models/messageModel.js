const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    },
},
    {
        timestamps: true
    }
)

module.exports = messageSchema
