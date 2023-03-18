const express = require('express')
const { ADMINISTRADOR } = require('../config/roles.js')
const {
  getAllProviders,
  findProvider,
  createProvider,
  updateProvider,
  deleteProvider
} = require('../controllers/proveedores.controller.js')
const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const providerRoute = express.Router()

providerRoute.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  getAllProviders
)

providerRoute.get(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  findProvider
)

providerRoute.post(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  createProvider
)

providerRoute.put(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  updateProvider
)

providerRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  deleteProvider
)

module.exports = providerRoute
