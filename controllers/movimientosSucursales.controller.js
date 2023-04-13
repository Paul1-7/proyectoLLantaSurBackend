const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/movimientosSucursales.service.js')
const {
  getProductSubsidiary,
  updateSubsidiariesProducts,
  updataSeveralSubsidiaryProduct
} = require('../services/sucursalesProductos.service.js')
const { getDateUTC4 } = require('../utils/dataHandler.js')

const msg = {
  delete: 'Se elimino el movimiento de la sucursal correctamente',
  addSuccess: 'Se registró el moviemiento de la sucursal correctamente',
  notValid: 'La informacion es incorrecta'
}
const getAllSubsidiariesMovements = async (req, res, next) => {
  try {
    const data = await services.getAllSubsidiariesMovements()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const createSubsidiaryMovement = async (req, res, next) => {
  try {
    const { idSucOrigen, idSucDestino, idProd, cantidad } = req.body

    const dataOrigen = await getProductSubsidiary(idProd, idSucOrigen)
    const dataDestino = await getProductSubsidiary(idProd, idSucDestino)
    const data = [dataOrigen.toJSON(), dataDestino.toJSON()]

    let isDecrement = true
    const newStock = data.map((row) => {
      const stock = isDecrement ? row.stock - cantidad : row.stock + cantidad
      isDecrement = !isDecrement
      return { ...row, stock }
    })
    if (!newStock.every(({ stock }) => stock >= 0)) {
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)
    }

    await updataSeveralSubsidiaryProduct(newStock)
    await services.createSubsidiaryMovement({
      ...req.body,
      fecha: getDateUTC4()
    })

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const deleteSubsidiaryMovement = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.deleteSubsidiaryMovement(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllSubsidiariesMovements,
  createSubsidiaryMovement,
  deleteSubsidiaryMovement
}
