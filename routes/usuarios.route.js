const express = require('express')
const { loginUser } = require('../controllers/usuarios.controller.js')

const userRoute = express.Router()

userRoute.post('/login', loginUser)

module.exports = userRoute
