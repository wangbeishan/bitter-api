const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    isValid: {
        type: Boolean,
        default: false
    },
    avatar: String
})

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}