const { default: mongoose } = require("mongoose");

const contentSchema = new mongoose.Schema({
    username: String,
    content: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    avatar: String
})

const Content = mongoose.model('Content', contentSchema)

module.exports = {
    Content
}