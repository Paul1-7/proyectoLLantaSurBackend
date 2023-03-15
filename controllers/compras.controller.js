const { PURCHASES_REPORT_ORDER_BY } = require('../constants/index.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { v4: uuidv4 } = require('uuid')
const { addPurchaseDetail } = require('../services/detalleCompras.service.js')

const {
  updataSeveralSubsidiaryProduct,
  getProductsSubsidiariesByIdProd
} = require('../services/sucursalesProductos.service.js')

const services = require('../services/compras.service.js')
const { getDateUTC4 } = require('../utils/dataHandler.js')
const {
  updateMultipleProducts,
  getProductsById
} = require('../services/productos.service.js')

const msg = {
  notFound: 'Compra no encontrada',
  delete: 'Compra eliminada',
  notValid: 'La informacion es incorrecta',
  addSuccess: 'Se registró la compra correctamente',
  modifySuccess: 'Se actualizó el registró de la compra correctamente',
  deleteSuccess: 'Se eliminoel registró de la compra correctamente'
}

const getNewStock = (allProduct, bodyProducts, isIncrement = false) => {
  return bodyProducts.map((product) => {
    const productFounded = allProduct.find(
      (dataValues) =>
        dataValues.idProd === product.idProd &&
        dataValues.idSuc === product.idSuc
    )
    const { id = uuidv4(), stock: prevStock = 0 } = productFounded || {}
    const newStockProd = isIncrement
      ? Number(prevStock) + Number(product.stock)
      : Number(prevStock) - Number(product.stock)

    return {
      id,
      stock: newStockProd,
      idSuc: product.idSuc,
      idProd: product.idProd
    }
  })
}

function getPurchaseDetail(clientDetail) {
  let totalPurchase = 0
  const purchaseDetail = clientDetail.map((rowDetail) => {
    const subtotal = rowDetail.cantidad * rowDetail.precioVenta
    totalPurchase += subtotal

    return {
      ...rowDetail,
      precio: rowDetail.precioVenta,
      subtotal
    }
  })

  return { purchaseDetail, totalPurchase }
}

const getAllPurchases = async (req, res, next) => {
  try {
    const purchase = await services.getAllPurchases()
    res.json(purchase)
  } catch (error) {
    next(error)
  }
}

const getPurchaseToReport = async (req, res, next) => {
  try {
    const { dateStart, dateEnd, orderBy } = req.query || {}

    if (!dateStart || !dateEnd || !orderBy)
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const orderByOption = PURCHASES_REPORT_ORDER_BY.find(
      ({ id }) => id === orderBy
    )

    const options = {
      dateStart,
      dateEnd,
      orderBy: orderByOption.criteria
    }

    const purchases = await services.getPurchaseToReport(options)
    res.json(purchases)
  } catch (error) {
    next(error)
  }
}

const findPurchase = async (req, res, next) => {
  try {
    const { id } = req.params
    const purchase = await services.findPurchase(id)

    if (!purchase) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(purchase)
  } catch (error) {
    next(error)
  }
}

const createPurchase = async (req, res, next) => {
  try {
    const { body } = req
    const { detalle, sucursalesProductos, ...compras } = body
    compras.fecha = getDateUTC4()

    const productsId = detalle.map((product) => product.idProd)

    const subsidiariesProductsData = await getProductsSubsidiariesByIdProd(
      productsId
    )

    if (subsidiariesProductsData.length === 0) {
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)
    }

    const newStock = getNewStock(
      subsidiariesProductsData,
      sucursalesProductos,
      true
    )

    if (!newStock.every(({ stock }) => stock >= 0))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    let { totalPurchase, purchaseDetail } = getPurchaseDetail(detalle)

    const { id: idCompra } = await services.createPurchase({
      ...compras,
      total: totalPurchase
    })

    sellDetail = purchaseDetail.map((detail) => ({
      ...detail,
      idCompra
    }))

    const idSucProdArray = newStock.map(({ id }) => id)

    await addPurchaseDetail(sellDetail)
    await updataSeveralSubsidiaryProduct(idSucProdArray, newStock)

    const productsToUpdate = await (
      await getProductsById(productsId)
    ).map((product) => {
      const productFounded = detalle.find(({ idProd }) => idProd === product.id)

      return {
        ...product,
        precioVenta: productFounded.precioVenta,
        precioCompra: productFounded.precioCompra
      }
    })
    await updateMultipleProducts(productsToUpdate, [
      'precioCompra',
      'precioVenta'
    ])

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllPurchases,
  findPurchase,
  createPurchase,
  getPurchaseToReport
}
