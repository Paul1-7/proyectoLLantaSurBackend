const { models } = require('../libs/sequelize.js')

async function getAllCategories() {
  return await models.Categorias.findAll()
}

async function findCategory(id) {
  return await models.Categorias.findByPk(id)
}

async function createCategory(user) {
  return await models.Categorias.create(user)
}

async function updateCategory(id, changes) {
  const user = await models.Categorias.findByPk(id)
  return await user?.update(changes)
}

async function deleteCategory(id) {
  const user = await models.Categorias.findByPk(id)
  return await user?.destroy()
}

module.exports = {
  getAllCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
