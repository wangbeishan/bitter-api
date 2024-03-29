const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { Verify } = require('../models/Verify')

const token = crypto.randomBytes(20).toString('hex')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'wangbeishan9527@gmail.com',
        pass: 'juduvikoozwygfrv'
    }
})

function sendMail(email) {
    const emailOption = {
        from: 'wangbeishan9527@gmail.com',
        to: email,
        subject: '请验证你的邮箱',
        html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>验证您的邮箱地址</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        line-height: 1.5;
                        color: #333;
                    }
                    h1 {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    p {
                        margin-bottom: 10px;
                    }
                    a {
                        color: #007bff;
                        text-decoration: none;
                        font-weight: bold;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <h1>验证您的邮箱地址</h1>
                <p>感谢您注册我们的服务！</p>
                <p>请单击链接 <a href="https://bitter-api.onrender.com/verify?email=${email}&token=${token}"> 链接 </a> 以验证您的邮箱地址</p>
                <p>如果单击链接无效，请复制并粘贴该链接到您的浏览器中。</p>
                <p>如果您没有注册我们的服务，请忽略此邮件。</p>
                <p>谢谢！</p>
            </body>
        </html>
    `
    }
    transporter.sendMail(emailOption,
        (err, info) => {
            if (err) {
                console.error(err)
            } else {
                Verify.create({
                    email: email,
                    token: token
                })
            }
        })
}

module.exports = {
    sendMail
}



