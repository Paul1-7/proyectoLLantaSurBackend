const express = require('express')
const { ADMINISTRADOR, EMPLEADO_VENTAS } = require('../config/roles.js')
const {
  createDefectiveProduct,
  getAllDefectivesProducts,
  getAllDefectivesProductsBySale,
  deleteDefectiveProduct
} = require('../controllers/productosDefectuosos.controller.js')
const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const defectiveProducts = express.Router()

defectiveProducts.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id)],
  getAllDefectivesProducts
)
defectiveProducts.get(
  '/ventas/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id)],
  getAllDefectivesProductsBySale
)
defectiveProducts.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  deleteDefectiveProduct
)
defectiveProducts.post(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id)],
  createDefectiveProduct
)

module.exports = defectiveProducts
