const express = require('express')
const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const {
  getAllPurchases,
  findPurchase,
  createPurchase,
  getPurchaseToReport
} = require('../controllers/compras.controller.js')
const { ADMINISTRADOR } = require('../config/roles.js')

const purchaseRoute = express.Router()

purchaseRoute.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  getAllPurchases
)
purchaseRoute.get(
  '/report/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  getPurchaseToReport
)
purchaseRoute.get(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  findPurchase
)

purchaseRoute.post(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  createPurchase
)
module.exports = purchaseRoute
