const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/dosificacionFacturas.service.js')

const msg = {
  notFound: 'datos no encontrado',
  modifySuccess:
    'Se actualizó el registró de la dosificacion facturas correctamente'
}

const getInvoiceBatching = async (req, res, next) => {
  try {
    const invoiceBatching = await services.getInvoiceBatching()
    res.json(invoiceBatching)
  } catch (error) {
    next(error)
  }
}

const updateInvoiceBatching = async (req, res, next) => {
  try {
    const { body } = req

    const invoiceBatching = await services.getInvoiceBatching()

    if (!invoiceBatching) return ERROR_RESPONSE.notFound(msg.notFound, res)
    const { id } = invoiceBatching
    await services.updateInvoiceBatching(id, body)

    res.json({ message: msg.modifySuccess, id: invoiceBatching.id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getInvoiceBatching,
  updateInvoiceBatching
}
