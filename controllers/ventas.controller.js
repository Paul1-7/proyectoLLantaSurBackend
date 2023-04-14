const { SALES_REPORT_ORDER_BY } = require('../constants/index.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { addSellDetail } = require('../services/detalleVentas.service.js')
const {
  incremetToInicialInvoiceNum
} = require('../services/dosificacionFacturas.service.js')
const {
  getProductsBySubsidiaryId
} = require('../services/productos.service.js')
const {
  updataSeveralSubsidiaryProduct
} = require('../services/sucursalesProductos.service.js')

const services = require('../services/ventas.service.js')
const {
  getNewStock,
  generateCodeToDocuments,
  getDateUTC4
} = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Venta no encontrada',
  delete: 'Venta eliminada',
  notValid: 'La informacion es incorrecta',
  addSuccess: 'Se registró la venta correctamente',
  modifySuccess: 'Se actualizó el registró de la venta correctamente'
}

function getSaleDetail(clientProducts, productsBySubsidiary, newStock) {
  let totalSales = 0
  const sellDetail = newStock.map((value) => {
    const product = clientProducts.find(
      (product) => product.idProd === value.idProd
    )

    const { precioVenta } = productsBySubsidiary.find(
      ({ id }) => id === value.idProd
    )

    totalSales += precioVenta * product.cantidad

    return {
      idProd: product.idProd,
      cantidad: product.cantidad,
      precioUni: precioVenta
    }
  })

  return { sellDetail, totalSales }
}

const getAllSells = async (req, res, next) => {
  try {
    const sell = await services.getAllSells()
    res.json(sell)
  } catch (error) {
    next(error)
  }
}

const getSaleToReport = async (req, res, next) => {
  try {
    const { dateStart, dateEnd, orderBy, subsidiary } = req.query || {}

    if (!dateStart || !dateEnd || !orderBy || !subsidiary)
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const orderByOption = SALES_REPORT_ORDER_BY.find(({ id }) => id === orderBy)

    const subsidiaryOption = subsidiary === 'all' ? null : subsidiary

    const options = {
      dateStart,
      dateEnd,
      orderBy: orderByOption.criteria,
      subsidiary: subsidiaryOption
    }

    const sales = await services.getSalesToReport(options)
    res.json(sales)
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

    const productsId = productos.map((product) => product.idProd)

    let productsBySubsidiary = await getProductsBySubsidiaryId(
      idSucursal,
      productsId
    )

    if (
      productsBySubsidiary.length === 0 ||
      productsBySubsidiary.length !== productos.length
    ) {
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)
    }

    const subsidiaries = productsBySubsidiary.map(
      ({ sucursales }) => sucursales[0].SucursalesProductos
    )
    const newStock = getNewStock(subsidiaries, productos)

    if (!newStock.every(({ stock }) => stock >= 0))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const codVenta = await incremetToInicialInvoiceNum()
    const numberSaleCode = await services.countSellsCode()

    const sell = {
      ...sellData,
      codVenta: codVenta.numFactInicial,
      idSuc: idSucursal,
      fecha: getDateUTC4(),
      codReferencia: generateCodeToDocuments('V', numberSaleCode)
    }

    let { totalSales, sellDetail } = getSaleDetail(
      productos,
      productsBySubsidiary,
      newStock
    )

    const { id: idVenta } = await services.createSell({
      ...sell,
      total: totalSales
    })

    sellDetail = sellDetail.map((detail) => ({
      ...detail,
      idVenta
    }))

    await addSellDetail(sellDetail)
    await updataSeveralSubsidiaryProduct(newStock)

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllSells,
  findSell,
  createSell,
  getSaleToReport
}
