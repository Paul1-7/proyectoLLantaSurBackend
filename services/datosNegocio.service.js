const { models } = require('../libs/sequelize.js')

async function getBusinessData() {
  return await models.Datos_Negocio.findAll()
}

async function updateBusinessData(id, changes) {
  const user = await models.Datos_Negocio.findByPk(id)
  return await user?.update(changes)
}

module.exports = {
  getBusinessData,
  updateBusinessData
}
