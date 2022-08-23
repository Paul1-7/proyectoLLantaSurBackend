const express = require('express')
const {
  getAllEmployees,
  findEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/empleados.controller.js')

const {
  checkId,
  checkBodyParams
} = require('../middlewares/validator.handle.js')

const employeeRoute = express.Router()

employeeRoute.get('/', getAllEmployees)

employeeRoute.get('/:id', checkId, findEmployee)

employeeRoute.post('/', checkBodyParams('roles'), createEmployee)

employeeRoute.put('/:id', checkId, checkBodyParams('roles'), updateEmployee)

employeeRoute.delete('/:id', checkId, deleteEmployee)

module.exports = employeeRoute
