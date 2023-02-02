const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function getAllCategories() {
  return await models.Categorias.findAll()
}

async function findCategory(id) {
  return await models.Categorias.findByPk(id, {
    include: 'productos'
  })
}

async function findCategoryByURL(url) {
  return await models.Categorias.findOne({
    where: {
      url
    },
    include: 'productos'
  })
}

async function createCategory(category) {
  return await models.Categorias.create(category)
}

async function updateCategory(id, changes) {
  const category = await models.Categorias.findByPk(id)
  return await category?.update(changes)
}

async function deleteCategory(id) {
  const category = await models.Categorias.findByPk(id, {
    include: 'productos'
  })
  if (category.productos.length > 0) return new Error(msg.msgErrorForeignKey)
  return await category?.destroy()
}

module.exports = {
  getAllCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  findCategoryByURL
}
