const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/sucursales.service.js')

const msg = {
  notFound: 'Sucursal no encontrada',
  delete: 'Sucursal eliminada'
}

const getAllSubsidiaries = async (req, res, next) => {
  try {
    const subsidiary = await services.getAllSubsidiaries()
    res.json(subsidiary)
  } catch (error) {
    next(error)
  }
}

const findSubsidiary = async (req, res, next) => {
  try {
    const { id } = req.params
    const subsidiary = await services.findSubsidiary(id)

    if (!subsidiary) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(subsidiary)
  } catch (error) {
    next(error)
  }
}

const createSubsidiary = async (req, res, next) => {
  try {
    const { body } = req
    const subsidiary = await services.createSubsidiary(body)
    res.json(subsidiary)
  } catch (error) {
    next(error)
  }
}

const updateSubsidiary = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const subsidiary = await services.updateSubsidiary(id, body)

    if (!subsidiary) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(subsidiary)
  } catch (error) {
    next(error)
  }
}

const deleteSubsidiary = async (req, res, next) => {
  try {
    const { id } = req.params
    const subsidiary = await services.deleteSubsidiary(id)

    if (!subsidiary) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllSubsidiaries,
  findSubsidiary,
  createSubsidiary,
  updateSubsidiary,
  deleteSubsidiary
}
