const express = require('express')

const {
  findDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getAllDiscounts
} = require('../controllers/descuentos.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const discountRoute = express.Router()

discountRoute.get('/', getAllDiscounts)
discountRoute.get('/:id', checkId, findDiscount)
discountRoute.post('/', createDiscount)
discountRoute.put('/:id', checkId, updateDiscount)
discountRoute.delete('/:id', checkId, deleteDiscount)

module.exports = discountRoute
