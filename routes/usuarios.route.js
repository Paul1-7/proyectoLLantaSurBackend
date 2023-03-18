const express = require('express')
const {
  CLIENTE,
  ADMINISTRADOR,
  EMPLEADO_VENTAS
} = require('../config/roles.js')
const {
  loginUser,
  refreshToken,
  logoutUser
} = require('../controllers/usuarios.controller.js')
const {
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const userRoute = express.Router()

userRoute.post('/login', loginUser)
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
