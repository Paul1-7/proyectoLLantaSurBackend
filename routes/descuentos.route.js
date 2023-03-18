const express = require('express')
const { ADMINISTRADOR, EMPLEADO_VENTAS } = require('../config/roles.js')

const {
  findDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getAllDiscounts
} = require('../controllers/descuentos.controller.js')
const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const discountRoute = express.Router()

discountRoute.get('/', getAllDiscounts)
discountRoute.get(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  findDiscount
)
discountRoute.post(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  createDiscount
)
discountRoute.put(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  updateDiscount
)
discountRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  deleteDiscount
)

module.exports = discountRoute
