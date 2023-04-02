const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/favoritos.service.js')

const msg = {
  notFound: 'producto no encontrado',
  delete: 'Se elimino el registro de favoritos correctamente',
  addSuccess: 'Se guardo el producto en favoritos correctamente'
}

const getAllFavoritesByIdClient = async (req, res, next) => {
  try {
    const { id } = req.params
    const favorites = await services.getAllFavoritesByIdClient(id)
    res.json(favorites)
  } catch (error) {
    next(error)
  }
}

const createFavorite = async (req, res, next) => {
  try {
    const { body } = req
    await services.createFavorite(body)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params

    const favorite = await services.deleteFavorite(id)

    if (!favorite) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllFavoritesByIdClient,
  createFavorite,
  deleteFavorite
}
