const { default: mongoose } = require("mongoose");

const verifySchema = new mongoose.Schema({
    email: String,
    token: String
})

const Verify = mongoose.model('verify', verifySchema)

module.exports = {
    Verify
}