const { models } = require('../libs/sequelize.js')

async function getBusinessData() {
  return (await models.DatosNegocio.findAll()).pop().toJSON()
}

async function updateBusinessData(id, changes) {
  const data = await models.DatosNegocio.findByPk(id)
  return await data?.update(changes)
}

module.exports = {
  getBusinessData,
  updateBusinessData
}
