const express = require('express')
const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const {
  getAllCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  findCategoryByURL
} = require('../controllers/categorias.controller.js')
const {
  EMPLEADO_VENTAS,
  CLIENTE,
  ADMINISTRADOR
} = require('../config/roles.js')

const categoryRoute = express.Router()

categoryRoute.get('/', getAllCategories)
categoryRoute.get('/url/:url', findCategoryByURL)
categoryRoute.get(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  findCategory
)
categoryRoute.put(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  updateCategory
)
categoryRoute.post(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  createCategory
)
categoryRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  deleteCategory
)

module.exports = categoryRoute
