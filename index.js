require("dotenv").config();
const express = require('express');
const app = express()
const cors = require('cors');
const colors = require('colors');
const cookieParser = require('cookie-parser')
const run = require("./database/database");
const port = process.env.PORT || 8080
const userRoute = require('./route/userRoutes.js')
const messageRoute = require('./route/messageRoutes.js')
const notificationRoute = require('./route/notificationRoutes.js')

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://chat-frontend-mocha.vercel.app/"
    ]
}))
app.use(express.json())
app.use(cookieParser())

// connecting database 
run()

app.use('/api/v1/user', userRoute)
app.use('/api/v1/message', messageRoute)
app.use('/api/v1/notification', notificationRoute)

// for checking 
app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: true
    })
})

app.listen(port, () => {
    console.log(`Hey buddy server is running on ${port}`.red)
})
