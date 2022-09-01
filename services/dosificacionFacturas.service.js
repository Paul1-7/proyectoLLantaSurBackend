const { models } = require('../libs/sequelize.js')

async function getInvoiceBatching() {
  return await models.Dosificacion_Facturas.findAll()
}

async function updateInvoiceBatching(id, changes) {
  const user = await models.Dosificacion_Facturas.findByPk(id)
  return await user?.update(changes)
}

module.exports = {
  getInvoiceBatching,
  updateInvoiceBatching
}
