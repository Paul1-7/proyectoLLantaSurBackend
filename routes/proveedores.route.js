const express = require('express')
const {
  getAllProviders,
  findProvider,
  createProvider,
  updateProvider,
  deleteProvider
} = require('../controllers/proveedores.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const providerRoute = express.Router()

providerRoute.get('/', getAllProviders)

providerRoute.get('/:id', checkId, findProvider)

providerRoute.post('/', createProvider)

providerRoute.put('/:id', checkId, updateProvider)

providerRoute.delete('/:id', checkId, deleteProvider)

module.exports = providerRoute
