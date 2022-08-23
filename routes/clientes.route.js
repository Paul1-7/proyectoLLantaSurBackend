const express = require('express')
const {
  getAllCustomers,
  findCustomer,
  updateCustomer,
  createCustomer,
  deleteCustomer
} = require('../controllers/clientes.controller.js')

const { checkId } = require('../middlewares/validator.handle.js')

const customerRoute = express.Router()

customerRoute.get('/', getAllCustomers)
customerRoute.get('/:id', checkId, findCustomer)
customerRoute.post('/', createCustomer)
customerRoute.put('/:id', checkId, updateCustomer)
customerRoute.delete('/:id', checkId, deleteCustomer)

module.exports = customerRoute
