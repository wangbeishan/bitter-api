const userController = require("./controllers/userController")
const contentController = require('./controllers/contentController')

module.exports = (app) => {
    app.post('/register', userController.register)
    app.post('/login', userController.login)
    app.get('/verify', userController.verifyEmail)
    app.get('/user/:email', userController.getUserByEmail)
    app.get('/users', userController.getUsers)

    app.post('/postContent', contentController.postContent)
    app.get('/contents', contentController.getContents)
    app.get('/test', userController.test)
    app.delete('/deleteAll', contentController.deleteAll)
}