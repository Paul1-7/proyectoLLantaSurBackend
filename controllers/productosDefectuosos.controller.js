const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')

const {
  getProductsBySubsidiaryId
} = require('../services/productos.service.js')
const {
  updataSeveralSubsidiaryProduct
} = require('../services/sucursalesProductos.service.js')

const services = require('../services/productosDefectuosos.service.js')
const { getNewStock, getDateUTC4 } = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Producto no encontrado',
  delete: 'Producto eliminado',
  notValid: 'La informacion es incorrecta',
  addSuccess: 'Se registró la informacipon correctamente',
  modifySuccess: 'Se actualizó el registró de la información correctamente'
}

const getAllDefectivesProducts = async (req, res, next) => {
  try {
    const products = await services.getAllDefectivesProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

const getAllDefectivesProductsBySale = async (req, res, next) => {
  try {
    const { id } = req.params
    const products = await services.getAllDefectivesProductsBySale(id)

    if (!products) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(products)
  } catch (error) {
    next(error)
  }
}

const createDefectiveProduct = async (req, res, next) => {
  try {
    const { data } = req.body
    const dateNow = getDateUTC4()

    if (!data?.idVenta) data.idVenta = null

    const dataWithDate = data.map((value) => ({
      ...value,
      fecha: dateNow
    }))
    const idsProd = data.map(({ idProd }) => idProd)
    const { idSuc } = data[0]

    const productsBySubsidiary = await getProductsBySubsidiaryId(idSuc, idsProd)

    if (
      productsBySubsidiary.length === 0 ||
      productsBySubsidiary.length !== idsProd.length
    ) {
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)
    }

    const subsidiaries = productsBySubsidiary.map(
      ({ sucursales }) => sucursales[0].Sucursales_Productos
    )
    const newStock = getNewStock(subsidiaries, data)

    if (!newStock.every(({ stock }) => stock >= 0))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const idSucProdArray = newStock.map(({ id }) => id)

    await services.createDefectiveProducts(dataWithDate)
    await updataSeveralSubsidiaryProduct(idSucProdArray, newStock)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const deleteDefectiveProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const products = await services.deleteDefectiveProducts(id)

    if (!products) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllDefectivesProducts,
  createDefectiveProduct,
  deleteDefectiveProduct,
  getAllDefectivesProductsBySale
}
