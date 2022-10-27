const { models } = require('../libs/sequelize.js')

async function getBusinessData() {
  return (await models.Datos_Negocio.findAll()).pop().toJSON()
}

async function updateBusinessData(id, changes) {
  const data = await models.Datos_Negocio.findByPk(id)
  return await data?.update(changes)
}

module.exports = {
  getBusinessData,
  updateBusinessData
}
