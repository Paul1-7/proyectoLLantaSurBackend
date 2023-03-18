const express = require('express')
const { ADMINISTRADOR } = require('../config/roles.js')
const {
  getAllEmployees,
  findEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/empleados.controller.js')

const {
  checkId,
  checkBodyParams,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const employeeRoute = express.Router()

employeeRoute.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  getAllEmployees
)

employeeRoute.get(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  findEmployee
)

employeeRoute.post(
  '/',
  [checkBodyParams('roles'), verifyToken, checkRoles(ADMINISTRADOR.id)],
  createEmployee
)

employeeRoute.put(
  '/:id',
  [
    checkId,
    checkBodyParams('roles'),
    verifyToken,
    checkRoles(ADMINISTRADOR.id)
  ],
  updateEmployee
)

employeeRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  deleteEmployee
)

module.exports = employeeRoute
