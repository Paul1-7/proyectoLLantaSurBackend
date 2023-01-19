const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function getAllDiscounts() {
  return await models.Descuentos.findAll()
}

async function findDiscount(id) {
  return await models.Descuentos.findByPk(id, {
    include: ['productos']
  })
}

async function createDiscount(Discount) {
  return await models.Descuentos.create(Discount)
}

async function updateDiscount(id, changes) {
  const discount = await models.Descuentos.findByPk(id)
  return await discount?.update(changes)
}

async function deleteDiscount(id) {
  const discount = await models.Descuentos.findByPk(id)

  return await discount?.destroy()
}

async function DiscountByIds(ids) {
  return await models.Descuentos.findAll({
    where: {
      id: { [Op.in]: ids }
    }
  })
}

module.exports = {
  getAllDiscounts,
  findDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  DiscountByIds
}
