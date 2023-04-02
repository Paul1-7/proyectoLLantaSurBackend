const { where } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function getAllFavoritesByIdClient(id) {
  return await models.Favoritos.findAll({
    include: [
      {
        model: models.Productos,
        as: 'producto',
        attributes: ['nombre', 'imagen']
      }
    ],
    where: {
      idCliente: id
    }
  })
}

async function createFavorite(favorite) {
  return await models.Favoritos.create(favorite)
}

async function deleteFavorite(id) {
  const favorite = await models.Favoritos.findByPk(id)
  return await favorite?.destroy()
}

module.exports = {
  getAllFavoritesByIdClient,
  createFavorite,
  deleteFavorite
}
