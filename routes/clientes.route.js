const express = require('express')
const {
  ADMINISTRADOR,
  EMPLEADO_VENTAS,
  CLIENTE
} = require('../config/roles.js')
const {
  getAllCustomers,
  findCustomer,
  updateCustomer,
  createCustomer,
  deleteCustomer,
  getAllActivesCustomers
} = require('../controllers/clientes.controller.js')

const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const customerRoute = express.Router()

customerRoute.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id)],
  getAllCustomers
)
customerRoute.get(
  '/actives',
  verifyToken,
  checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id),
  getAllActivesCustomers
)
customerRoute.get(
  '/:id',
  [
    checkId,
    verifyToken,
    checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id, CLIENTE.id)
  ],
  findCustomer
)
customerRoute.post('/', createCustomer)
customerRoute.put(
  '/:id',
  [
    checkId,
    verifyToken,
    checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id, CLIENTE.id)
  ],
  updateCustomer
)
customerRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id, EMPLEADO_VENTAS.id)],
  deleteCustomer
)

module.exports = customerRoute
