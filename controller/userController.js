const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const userSchema = require('../models/userModel');
const jwtToken = require('../utils/tokenCreate');
const User = new mongoose.model('User', userSchema)
const bcrypt = require('bcrypt');

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
                    status: 401,
                    message: 'User already exist'
                })
            }

            const result = await User.create({
                name,
                email,
                password
            })

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

            res.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!password && !email) {
                return res.status(401).send({
                    status: 401,
                    message: "Please enter all data"
                })
            }

            const user = await User.findOne({ email })
            if (user?._id) {
                const match =await bcrypt.compare(password, user?.password)
                console.log(match,'match')
                if (!match) {
                    return res.status(404).send({
                        status: 404,
                        message: "Password Incorrect"
                    })
                }
                const accessToken = jwtToken(user._id)
                res.status(201).send({
                    status: 201,
                    message: "Success",
                    result: user,
                    token: accessToken
                })
            } else {
                res.status(404).send({
                    status: 404,
                    message: "User doesn't exist"
                })
            }

        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }
}


module.exports = userController

