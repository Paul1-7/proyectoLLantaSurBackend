const { PURCHASES_REPORT_ORDER_BY } = require('../constants/index.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { v4: uuidv4 } = require('uuid')
const {
  addPurchaseDetail,
  removePurchaseDetail
} = require('../services/detalleCompras.service.js')

const {
  getProductSubsidiaryByIdProd,
  updateSubsidiariesProducts,
  getProductsSubsidiariesByIds,
  updataSeveralSubsidiaryProduct,
  addSubsidiaryProduct,
  addSubsidiariesProducts
} = require('../services/sucursalesProductos.service.js')

const services = require('../services/compras.service.js')
const {
  getDateUTC4,
  generateCodeToDocuments
} = require('../utils/dataHandler.js')
const {
  updateMultipleProducts,
  getProductsById
} = require('../services/productos.service.js')
const {
  addSubProdPurchases,
  getSubProdPurchasesByIds,
  removeSubProdPurchaseByIdPurchase
} = require('../services/sucursalesProductosCompras.service.js')

const msg = {
  notFound: 'Compra no encontrada',
  delete: 'Compra eliminada',
  notValid: 'La informacion es incorrecta',
  addSuccess: 'Se registró la compra correctamente',
  modifySuccess: 'Se actualizó el registró de la compra correctamente',
  deleteSuccess: 'Se eliminoel registró de la compra correctamente'
}

const getNewStock = (allProduct, bodyProducts, isIncrement = false) => {
  const idProdFromAllProducts = allProduct.map(({ idProd }) => idProd)

  const aux = bodyProducts.filter(({ idProd }) =>
    idProdFromAllProducts.includes(idProd)
  )

  return aux.map((product) => {
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
    let newDataToSubProd = []
    const numberPurchaseCode = await services.countPurchaseCode()
    compras.fecha = getDateUTC4()
    compras.codReferencia = generateCodeToDocuments('C', numberPurchaseCode)

    const productsId = detalle.map((product) => product.idProd)
    const subsidiariesProductsData = await getProductSubsidiaryByIdProd(
      productsId
    )

    // verify if exist registers in the database
    if (sucursalesProductos.length !== subsidiariesProductsData.length) {
      const idProdFromSubProdData = subsidiariesProductsData.map(
        (data) => data.idProd
      )

      const newSubProd = sucursalesProductos.filter(
        ({ idProd }) => !idProdFromSubProdData.includes(idProd)
      )

      newDataToSubProd = await addSubsidiariesProducts(newSubProd)
    }

    if (!subsidiariesProductsData.length && !newDataToSubProd.length) {
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

    const newPurchaseDetail = purchaseDetail.map((detail) => ({
      ...detail,
      idCompra
    }))

    let dataStockPurchases = newStock.map(({ id }, index) => ({
      stock: sucursalesProductos?.[index].stock,
      idSucProd: id,
      idCompra
    }))

    if (newDataToSubProd.length) {
      const newDataStockPurchase = newDataToSubProd.map(({ id, stock }) => {
        return {
          stock,
          idSucProd: id,
          idCompra
        }
      })

      dataStockPurchases = [...dataStockPurchases, ...newDataStockPurchase]
    }

    await addPurchaseDetail(newPurchaseDetail)
    await addSubProdPurchases(dataStockPurchases)
    await updateSubsidiariesProducts(newStock)

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

const deletePurchase = async (req, res, next) => {
  try {
    const { id } = req.params
    const subProdPurchase = await getSubProdPurchasesByIds(id)
    const idsSubProd = subProdPurchase.map(({ idSucProd }) => idSucProd)
    const subProd = await getProductsSubsidiariesByIds(idsSubProd)

    const newStock = subProd.map((item) => {
      const value = subProdPurchase.find(
        ({ idSucProd }) => idSucProd === item.id
      )
      return {
        ...item,
        stock: item.stock - value.stock
      }
    })

    if (!newStock.every(({ stock }) => stock >= 0))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    await updataSeveralSubsidiaryProduct(newStock)
    await removeSubProdPurchaseByIdPurchase(id)
    await removePurchaseDetail(id)
    const purchase = await services.removePurchase(id)

    if (!purchase) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllPurchases,
  findPurchase,
  createPurchase,
  getPurchaseToReport,
  deletePurchase
}
