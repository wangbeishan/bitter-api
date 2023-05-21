const { User } = require("../models/User")
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const transporter = require('../common/emailVerify')
const { Verify } = require("../models/Verify")
const { generate, fun, generateAvatar } = require("../common/generateAvatar")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSeccret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {

    async test(req, res) {
        console.log("111");
        generate()
    },

    async verifyEmail(req, res) {
        const { email, token } = req.query
        await Verify.findOneAndDelete({ email: email, token: token})
                        .then((response) => {
                            User.findOneAndUpdate(
                                { email: email },
                                { $set: { isValid: true }}
                            )
                            .then((response) => {
                                res.status(200).send({
                                    message: '你的邮箱已成功验证'
                                })
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                        })
                        .catch((error) => {
                            console.error(error)
                        })
    },

    async register(req, res) {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(404).send({
                message: '邮箱已注册'
            })
        } else {
            transporter.sendMail(req.body.email)
            const avatar = generateAvatar(req.body.email)
            let user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: avatar
            }
            User.create(user)
            res.status(200).send({
                message: '请查看邮箱进行验证'
            })
        }
    },

    async login(req, res) {
        const email = req.body.email
        const password = req.body.password
        let user = await User.findOne({ email: email })
        console.log(user)
        if (!user || !user.isValid) {
            return res.status(404).send({
                message: '用户无效'
            })
        }

        var isMatch = false

        if (user.password === password) {
            isMatch = true
        }
        if (isMatch) {
            user = user.toJSON()
            return res.status(200).send({
                user: {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar
                },
                token: jwtSignUser(user)
            })
        }
        return res.status(404).send({
            message: '密码无效'
        })
    },

    async getUserByEmail(req, res) {
        const user = await User.findOne({ email: req.params.email })
        if (!user) {
            return res.status(404).send({
                message: '用户不存在'
            })
        }
        return res.status(200).send({
            user: {
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        })
    },

    async getUsers(req, res) {
        const users = await User.find()
        if (!users) {
            return res.status(404).send({
                message: '用户不存在'
            })
        }
        return res.status(200).send({
            users: users
        })
    }
}
