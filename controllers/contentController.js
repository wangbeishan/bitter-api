const { generate, fun } = require("../common/generateAvatar")
const { Content } = require("../models/Content")
const gravatar = require('gravatar')
const multer = require('multer')

module.exports = {
    test(req, res) {
        console.log(req.body)
        res.status(200).send({
            message: 'TEST!!!'
        })
    },

    async postContent(req, res) {
        // console.log(req.body)
        let tmp = await Content.create(req.body)
        if (tmp) {
            return res.status(200).send({
                message: '发送成功',
                content: tmp
            })
        }

        return res.status(404).send({
            message: '发送失败'
        })
    },

    async getContents(req, res) {
        const contents = Content.find()
            .sort( {createDate: -1} )
            .then((result) => {
                if (result) {
                    return res.status(200).send({
                        message: '获取内容成功',
                        contents: result
                    })
                }
                return res.status(404).send({
                    message: '获取内容失败'
                })
            })
            .catch((error) => {
                console.error(error)
            })
    },

    // async getContentById(req, res) {

    // },

    // async getContentByUser(req, res) {

    // },

    // async getContentByDate(req, res) {

    // },

    // async deleteContentById(req, res) {

    // }

    async deleteAll(req, res) {
        Content.deleteMany({})
            .then((result) => {
                if (result) {
                    return res.status(200).send({
                        message: '删除成功'
                    })
                }
                return res.status(404).send({
                    message: '删除失败'
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }
}