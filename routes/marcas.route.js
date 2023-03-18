const express = require('express')
const { ADMINISTRADOR } = require('../config/roles.js')
const {
  getAllBrands,
  findBrand,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/marcas.controller.js')

const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const brandRoute = express.Router()

brandRoute.get('/', [verifyToken, checkRoles(ADMINISTRADOR.id)], getAllBrands)
brandRoute.get(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  findBrand
)
brandRoute.post('/', [verifyToken, checkRoles(ADMINISTRADOR.id)], createBrand)
brandRoute.put(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  updateBrand
)
brandRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  deleteBrand
)

module.exports = brandRoute
