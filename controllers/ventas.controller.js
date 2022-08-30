const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const {} = require('../services/productos.service.js')
const {
  getProductsBySubsidiariesId
} = require('../services/sucursalesProductos.service.js')
const services = require('../services/ventas.service.js')
const { areValidData, getNewStock } = require('../utils/dataHandler.js')

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
    const { productos, idSucursal } = body

    const allProducts = await getProductsBySubsidiariesId(idSucursal)
    const targetProducts = body.productos.map((product) => product.idProd)
    const allIdProducts = allProducts.map((product) => product.idProd)

    if (
      allProducts.length === 0 &&
      !areValidData(allIdProducts, targetProducts)
    ) {
      return ERROR_RESPONSE.notFound(msg.notValid, res)
    }

    const newStock = getNewStock(allProducts, productos)
    console.log(newStock)
    // newStockProducts = productsSelected.map(({ dataValues }) => {
    //   return {
    //     stockProd: dataValues.stockProd * 2
    //   }
    // })
    // console.log({ newStockProducts })
    //const sell = await services.createSell(body)
    res.json(newStock)
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
