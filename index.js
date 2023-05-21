const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/config')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

app.use(bodyParser.json())


const corsOptions = {
    allowedOrigins: "*",
    origin: "https://bitter-app.netlify.app",
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

const DBurl = 'mongodb+srv://wangbeishan9527:SwB9tSvCYDcHti0i@cluster0.vcvir4c.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DBurl, { 
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connect failed'))
db.once('open', () => {
    console.log('Database connected');
})

routes(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
