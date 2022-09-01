const { query } = require('express')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { addSellDetail } = require('../services/detalleVentas.service.js')
const {
  getInvoiceBatching
} = require('../services/dosificacionFacturas.service.js')
const {
  getAllProductsBySubsidiaryId
} = require('../services/productos.service.js')
const {
  updateSubsidiaryProduct
} = require('../services/sucursalesProductos.service.js')

const services = require('../services/ventas.service.js')
const {
  areValidData,
  getNewSubdiaryProduct
} = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Venta no encontrada',
  delete: 'Venta eliminada',
  notValid: 'La informacion es incorrecta'
}

const getAllSells = async (req, res, next) => {
  try {
    const sell = await services.getAllSells()
    res.json(sell)
  } catch (error) {
    next(error)
  }
}

const findSell = async (req, res, next) => {
  try {
    const { id } = req.params
    const sell = await services.findSell(id)

    if (!sell) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(sell)
  } catch (error) {
    next(error)
  }
}

const createSell = async (req, res, next) => {
  try {
    const { body } = req
    const { productos, idSucursal, ...sellData } = body

    const codVenta = await getInvoiceBatching()

    const sell = {
      codVenta: codVenta.pop().numFactInicial,
      tipoVenta: 1,
      metodoPago: 1,
      ...sellData
    }

    const productsBySubsidiary = await getAllProductsBySubsidiaryId(idSucursal)
    const subsidiaries = productsBySubsidiary.map(({ dataValues }) => {
      return dataValues.sucursales.pop().dataValues.Sucursales_Productos
        .dataValues
    })
    if (
      productsBySubsidiary.length === 0 ||
      !areValidData(subsidiaries, productos, 'idProd', 'idProd')
    ) {
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)
    }

    const newData = getNewSubdiaryProduct(subsidiaries, productos)
    console.log(newData)

    const isValid = newData.every((value) => value.stockProd > 0)
    if (!isValid) return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const idSucProdArray = newData.map((value) => value.idSucProd)
    const stockUpdated = await updateSubsidiaryProduct(idSucProdArray, newData)

    const newSell = await (await services.createSell(sell)).toJSON()

    const sellDetail = newData.map((value) => {
      const product = productos.find(
        (product) => product.idProd === value.idProd
      )

      const { precioVenta } = productsBySubsidiary.find(
        ({ dataValues }) => dataValues.idProd === value.idProd
      )

      return {
        idProd: product.idProd,
        idVenta: newSell.idVenta,
        cantidadDetVenta: product.cantidadDetVenta,
        precioUniVenta: precioVenta
      }
    })
    console.log(sellDetail)
    const newSellDetail = await addSellDetail(sellDetail)

    res.json({
      ...newSell,
      detalle: newSellDetail
    })
  } catch (error) {
    next(error)
  }
}

const updateSell = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const sell = await services.updateSell(id, body)

    if (!sell) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(sell)
  } catch (error) {
    next(error)
  }
}

const deleteSell = async (req, res, next) => {
  try {
    const { id } = req.params
    const sell = await services.deleteSell(id)

    if (!sell) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllSells,
  findSell,
  createSell,
  updateSell,
  deleteSell
}
