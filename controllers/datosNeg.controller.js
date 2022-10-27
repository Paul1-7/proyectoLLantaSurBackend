const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/datosNegocio.service.js')

const msg = {
  notFound: 'datos no encontrado',
  modifySuccess: 'Se actualizó los datos de la empresa correctamente'
}

const getBusinessData = async (req, res, next) => {
  try {
    const businessData = await services.getBusinessData()
    res.json(businessData)
  } catch (error) {
    next(error)
  }
}

const updateBusinessData = async (req, res, next) => {
  try {
    const { body } = req

    const businessData = await services.getBusinessData()

    if (!businessData) return ERROR_RESPONSE.notFound(msg.notFound, res)
    const { id } = businessData
    await services.updateBusinessData(id, body)

    res.json({ message: msg.modifySuccess, id: businessData.id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getBusinessData,
  updateBusinessData
}
