const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            trim: true,
            required: true
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


// userSchema.pre("save", async function (next) {
//     if (!this.isModified) {
//         next();
//     }


//     this.password = await bcrypt.hash(this.password, 10);
// });


// const User=mongoose.model('User', userSchema)
module.exports = userSchema





