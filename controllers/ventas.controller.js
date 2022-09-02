const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { addSellDetail } = require('../services/detalleVentas.service.js')
const {
  incremetToInicialInvoiceNum
} = require('../services/dosificacionFacturas.service.js')
const {
  getProductsBySubsidiaryId
} = require('../services/productos.service.js')
const {
  updateSubsidiaryProduct
} = require('../services/sucursalesProductos.service.js')

const services = require('../services/ventas.service.js')
const {
  getNewSubdiaryProduct,
  getStockUpdated
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

    const codVenta = await incremetToInicialInvoiceNum()

    const sell = {
      codVenta: codVenta.numFactInicial,
      tipoVenta: 1,
      metodoPago: 1,
      ...sellData
    }

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

    productsBySubsidiary = productsBySubsidiary.map((product) =>
      product.toJSON()
    )

    const subsidiaries = productsBySubsidiary.map(
      ({ sucursales }) => sucursales.pop().Sucursales_Productos
    )
    const newSubsidiaryProd = getNewSubdiaryProduct(subsidiaries, productos)

    if (!newSubsidiaryProd.every(({ stockProd }) => stockProd > 0))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const idSucProdArray = newSubsidiaryProd.map((value) => value.idSucProd)
    await updateSubsidiaryProduct(idSucProdArray, newSubsidiaryProd)

    const newSell = await services.createSell(sell)

    const sellDetail = newSubsidiaryProd.map((value) => {
      const product = productos.find(
        (product) => product.idProd === value.idProd
      )

      const { precioVenta } = productsBySubsidiary.find(
        ({ idProd }) => idProd === value.idProd
      )

      return {
        idProd: product.idProd,
        idVenta: newSell.toJSON().idVenta,
        cantidadDetVenta: product.cantidadDetVenta,
        precioUniVenta: precioVenta
      }
    })
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
    const { productos, idSucursal, ...sellData } = body

    const oldSale = await services.findSell(id).then((sales) => sales.toJSON())

    if (!oldSale) {
      return ERROR_RESPONSE.notFound(msg.notFound, res)
    }

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

    productsBySubsidiary = productsBySubsidiary.map((product) =>
      product.toJSON()
    )

    const subsidiaries = productsBySubsidiary.map(
      ({ sucursales }) => sucursales.pop().Sucursales_Productos
    )

    const updateStock = getStockUpdated(productos, oldSale.detalle)
    console.log({ updateStock })
    const newSubsidiaryProd = getNewSubdiaryProduct(subsidiaries, updateStock)
    console.log({ newSubsidiaryProd })
    if (!newSubsidiaryProd.every(({ stockProd }) => stockProd > 0))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    // const idSucProdArray = newSubsidiaryProd.map((value) => value.idSucProd)
    // await updateSubsidiaryProduct(idSucProdArray, newSubsidiaryProd)

    // const newSell = await services.createSell(sell)

    // const sellDetail = newSubsidiaryProd.map((value) => {
    //   const product = productos.find(
    //     (product) => product.idProd === value.idProd
    //   )

    //   const { precioVenta } = productsBySubsidiary.find(
    //     ({ idProd }) => idProd === value.idProd
    //   )

    //   return {
    //     idProd: product.idProd,
    //     idVenta: newSell.toJSON().idVenta,
    //     cantidadDetVenta: product.cantidadDetVenta,
    //     precioUniVenta: precioVenta
    //   }
    // })
    // const newSellDetail = await addSellDetail(sellDetail)

    res.json({
      ...newSell,
      detalle: newSellDetail
    })
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
