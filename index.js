require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');
const colors = require('colors');
const run = require("./database/database");
const port = process.env.PORT || 8080
app.use(cors())
app.use(express.json())


// connecting database 
run()

// for checking 
app.get('/', async(req, res) => {
    res.status(200).send({
        message:'Success',
        status:true
    })
})

app.listen(port, () => {
    console.log(`Hey buddy server is running on ${port}`.red)
})
