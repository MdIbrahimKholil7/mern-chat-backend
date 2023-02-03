const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const userSchema = require('../models/userModel');
const jwtToken = require('../utils/tokenCreate');
const User = new mongoose.model('User', userSchema)
const bcrypt = require('bcrypt');
const { getLastMessage } = require('../services/messageService');

const userController = {

    signUp: async (req, res) => {

        try {
            const { name, email, password } = req.body
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

            let result = await User.create({
                name,
                email,
                password
            })
            result = result.toObject()
            delete result.password
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

            let user = await User.findOne({ email })
            if (user?._id) {
                const match = await bcrypt.compare(password, user?.password)
                user = user.toObject()
                delete user.password
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
    },
    getUserInformation: async (req, res) => {
        try {
            const result = await User.findOne({ _id: req.decoded.id }).select('-password')
            if (result) {
                res.send({
                    status: true,
                    message: "success",
                    result
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    getAllUser: async (req, res) => {
        try {

            const friend = []
            const result = await User.find({ _id: { $ne: req.decoded.id } }).sort({ createdAt: -1 }).select('-password')
            for (let i = 0; i < result.length; i++) {
                const data = await getLastMessage(req.decoded.id, result[i]._id)
                friend.push({ friendInfo: result[i], lastMsg: data })
            }
            if (result) {
                res.send({
                    status: true,
                    message: "success",
                    result: friend
                })
            }
            // console.log('getAllUser',result)
        } catch (error) {
            console.log(error)
        }
    },
    updateUser: async (req, res) => {
        try {
            const result = await User.findOneAndUpdate({ _id: req.decoded.id }, { $set: req.body })
            if (result) {
                res.send({
                    status: true,
                    message: "success",
                    result
                })
            }
            // console.log('getAllUser',result)
        } catch (error) {
            console.log(error)
        }
    },

}


module.exports = userController

