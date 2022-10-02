const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/proveedores.service.js')

const msg = {
  notFound: 'Proveedor no encontrado',
  delete: 'Proveedor eliminado',
  addSuccess: 'Se registró el proveedor correctamente',
  modifySuccess: 'Se actualizó el registró del proveedor correctamente'
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
    await services.createProvider(body)
    res.json({ message: msg.addSuccess })
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

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const deleteProvider = async (req, res, next) => {
  try {
    const { id } = req.params
    const provider = await services.deleteProvider(id)

    if (provider instanceof Error)
      return ERROR_RESPONSE.notAcceptable(provider.message, res)

    if (!provider) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete, id })
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
