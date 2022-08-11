const express = require('express')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { checkId } = require('../middlewares/validator.handle.js')
const {
  getAllProviders,
  findProvider,
  createProvider,
  updateProvider,
  deleteProvider
} = require('../services/proveedores.service.js')

const providerRoute = express.Router()

const msg = {
  notFound: 'Proveedor no encontrado',
  delete: 'Proveedor eliminado'
}

providerRoute.get('/', async (req, res, next) => {
  try {
    const provider = await getAllProviders()
    res.json(provider)
  } catch (error) {
    next(error)
  }
})

providerRoute.get('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const provider = await findProvider(id)

    if (!provider) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(provider)
  } catch (error) {
    next(error)
  }
})

providerRoute.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const provider = await createProvider(body)
    res.json(provider)
  } catch (error) {
    next(error)
  }
})

providerRoute.put('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const provider = await updateProvider(id, body)

    if (!provider) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(provider)
  } catch (error) {
    next(error)
  }
})

providerRoute.delete('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const provider = await deleteProvider(id)

    if (!provider) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
})

module.exports = providerRoute
