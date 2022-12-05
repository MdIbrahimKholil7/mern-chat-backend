const mongoose = require('mongoose');
const colors = require('colors');
const run = async () => {
    try {
        await mongoose.connect(`mongodb+srv://ibrahim:${process.env.USER_PASS}@cluster0.uvaokvb.mongodb.net/chat_app?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        ).then(() => {
            console.log('connection success'.yellow.bold)
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports=run

