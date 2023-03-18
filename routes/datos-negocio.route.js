const express = require('express')
const { ADMINISTRADOR, EMPLEADO_VENTAS } = require('../config/roles')
const {
  getBusinessData,
  updateBusinessData
} = require('../controllers/datosNeg.controller')
const { verifyToken, checkRoles } = require('../middlewares/validator.handle')

const datosNegRoute = express.Router()

datosNegRoute.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id)],
  getBusinessData
)
datosNegRoute.put(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  updateBusinessData
)

module.exports = datosNegRoute
