const { models } = require('../libs/sequelize.js')

async function getInvoiceBatching() {
  return await await models.Dosificacion_Facturas.findAll().pop()
}

async function updateInvoiceBatching(id, changes) {
  const data = await models.Dosificacion_Facturas.findByPk(id)
  return await data?.update(changes)
}

async function incremetToInicialInvoiceNum() {
  const data = (await models.Dosificacion_Facturas.findAll()).pop()
  const newData = {
    ...data.toJSON(),
    numFactInicial: data.numFactInicial + 1
  }
  return await (await data?.update(newData)).toJSON()
}

module.exports = {
  getInvoiceBatching,
  incremetToInicialInvoiceNum,
  updateInvoiceBatching
}
