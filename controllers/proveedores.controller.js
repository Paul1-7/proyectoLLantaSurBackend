const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/proveedores.service.js')

const msg = {
  notFound: 'Proveedor no encontrado',
  delete: 'Proveedor eliminado'
}

const getAllProviders = async (req, res, next) => {
  try {
    const provider = await services.getAllProviders()
    res.json(provider)
  } catch (error) {
    next(error)
  }
}

const findProvider = async (req, res, next) => {
  try {
    const { id } = req.params
    const provider = await services.findProvider(id)

    if (!provider) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(provider)
  } catch (error) {
    next(error)
  }
}

const createProvider = async (req, res, next) => {
  try {
    const { body } = req
    const provider = await services.createProvider(body)
    res.json(provider)
  } catch (error) {
    next(error)
  }
}

const updateProvider = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const provider = await services.updateProvider(id, body)

    if (!provider) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(provider)
  } catch (error) {
    next(error)
  }
}

const deleteProvider = async (req, res, next) => {
  try {
    const { id } = req.params
    const provider = await services.deleteProvider(id)

    if (!provider) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProviders,
  findProvider,
  createProvider,
  updateProvider,
  deleteProvider
}
