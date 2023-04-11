const express = require('express')
const { ADMINISTRADOR, EMPLEADO_VENTAS } = require('../config/roles.js')
const {
  getAllSubsidiariesMovements,
  createSubsidiaryMovement,
  deleteSubsidiaryMovement
} = require('../controllers/movimientosSucursales.controller.js')

const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const subsidiaryMovementRoute = express.Router()

subsidiaryMovementRoute.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id)],
  getAllSubsidiariesMovements
)
subsidiaryMovementRoute.post(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id)],
  createSubsidiaryMovement
)
subsidiaryMovementRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  deleteSubsidiaryMovement
)

module.exports = subsidiaryMovementRoute
