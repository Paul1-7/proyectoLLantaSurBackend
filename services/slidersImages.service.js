const { models } = require('../libs/sequelize.js')

async function getAllSlidersImages() {
  return await models.SlidersImages.findAll({
    include: [
      {
        model: models.Productos,
        as: 'producto',
        attributes: ['id', 'nombre']
      }
    ]
  })
}

async function updateSlidersImages(data) {
  return await models.SlidersImages.bulkCreate(data, {
    updateOnDuplicate: ['idProd', 'urlImg', 'estado']
  })
}

module.exports = {
  getAllSlidersImages,
  updateSlidersImages
}
