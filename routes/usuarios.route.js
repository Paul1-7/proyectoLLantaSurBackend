const express = require('express')
const {
  loginUser,
  refreshToken,
  logoutUser
} = require('../controllers/usuarios.controller.js')

const userRoute = express.Router()

userRoute.post('/login', loginUser)
userRoute.post('/refresh', refreshToken)
userRoute.post('/logout', logoutUser)

module.exports = userRoute
