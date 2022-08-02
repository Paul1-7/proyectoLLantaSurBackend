const express = require('express')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { checkId } = require('../middlewares/validator.handle.js')
const {
  getAllCustomers,
  findCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../services/clientes.service.js')

const customerRoute = express.Router()

const msg = {
  notFound: 'Cliente no encontrado',
  delete: 'Cliente eliminado'
}

customerRoute.get('/', async (req, res, next) => {
  try {
    const customer = await getAllCustomers()
    res.json(customer)
  } catch (error) {
    next(error)
  }
})

customerRoute.get('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const customer = await findCustomer(id)

    if (!customer) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(customer)
  } catch (error) {
    next(error)
  }
})

customerRoute.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const customer = await createCustomer(body)
    delete customer.dataValues.password
    res.json(customer)
  } catch (error) {
    next(error)
  }
})

customerRoute.put('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const customer = await updateCustomer(id, body)

    if (!customer) return ERROR_RESPONSE.notFound(msg.notFound, res)

    delete customer.dataValues.password
    res.json(customer)
  } catch (error) {
    next(error)
  }
})

customerRoute.delete('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const customer = await deleteCustomer(id)

    if (!customer) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
})

module.exports = customerRoute
