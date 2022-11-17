const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    password: {
        type: String,
        trim: true,
        require: true
    },
    img: {
        type: String,
        trim: true
    }
},
    {
        timestamps: true
    }
)

module.export = mongoose.model('User', userSchema)





