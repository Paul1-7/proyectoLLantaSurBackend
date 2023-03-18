const express = require('express')
const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const {
  getAllSells,
  findSell,
  createSell,
  getSaleToReport
} = require('../controllers/ventas.controller.js')
const { ADMINISTRADOR, CLIENTE } = require('../config/roles.js')

const sellRoute = express.Router()

sellRoute.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id, CLIENTE.id)],
  getAllSells
)
sellRoute.get(
  '/report/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  getSaleToReport
)
sellRoute.get(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id, CLIENTE.id)],
  findSell
)

sellRoute.post(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id, CLIENTE.id)],
  createSell
)
module.exports = sellRoute
