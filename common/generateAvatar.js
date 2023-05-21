const gravatar = require('gravatar')
const crypto = require('crypto')

const generateAvatar = (email) => {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    const avatar = gravatar.url(hash, { s: '200', r: 'pg', d: 'retro'}, true)
    return avatar
}

module.exports = {
    generateAvatar
}