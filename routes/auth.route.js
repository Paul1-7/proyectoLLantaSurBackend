const express = require('express')
const {
  CLIENTE,
  ADMINISTRADOR,
  EMPLEADO_VENTAS
} = require('../config/roles.js')
const {
  loginUser,
  refreshToken,
  logoutUser,
  verifyPhoneNumber
} = require('../controllers/auth.controller.js')
const {
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const userRoute = express.Router()

userRoute.post('/login', loginUser)
userRoute.post('/verificar-telefono', verifyPhoneNumber)
userRoute.post(
  '/refresh',
  [verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id, CLIENTE.id)],
  refreshToken
)
userRoute.post(
  '/logout',
  [verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id, CLIENTE.id)],
  logoutUser
)

module.exports = userRoute
