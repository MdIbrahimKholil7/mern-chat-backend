const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const userSchema = require('../models/userModel');
const jwtToken = require('../utils/tokenCreate');
const User = new mongoose.model('User', userSchema)

const userController = {

    signUp: async (req, res) => {
        try {
            const { name, email, password } = req.body
            console.log(req.body)

            if (!name || !email || !password) {
                return res.status(400).send({
                    message: "Please enter all the data"
                })
            }



            const userFound = await User.find({ email })

            if (userFound.length > 0) {
                return res.status(400).send({
                    message: 'User already exist'
                })
            }

            const result = await User.create({
                name,
                email,
                password
            })

            // const result = await user.save()
            console.log(result)
            if (result) {

                const accessToken = jwtToken(result._id)

                res.status(201).cookie('auth', accessToken, {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000)
                }).send({
                    message: "Success",
                    token: accessToken,
                    result
                })
                
            }
        } catch (error) {
            console.log(error)
        }
    }


}


module.exports = userController

