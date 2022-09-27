const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/marcas.service.js')

const msg = {
  notFound: 'Marca no encontrada',
  delete: 'Se elimino la marca correctamente',
  addSuccess: 'Se registro la marca correctamente',
  modifySuccess: 'Se actualizo el registro de la marca correctamente'
}
const getAllBrands = async (req, res, next) => {
  try {
    const brand = await services.getAllBrands()
    res.json(brand)
  } catch (error) {
    next(error)
  }
}

const findBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const brand = await services.findBrand(id)

    if (!brand) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(brand)
  } catch (error) {
    next(error)
  }
}

const createBrand = async (req, res, next) => {
  try {
    const { body } = req
    await services.createBrand(body)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const brand = await services.updateBrand(id, body)

    if (!brand) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const brand = await services.deleteBrand(id)

    if (brand instanceof Error)
      return ERROR_RESPONSE.notAcceptable(brand.message, res)

    if (!brand) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllBrands,
  findBrand,
  createBrand,
  updateBrand,
  deleteBrand
}
