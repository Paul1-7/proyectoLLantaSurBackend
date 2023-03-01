const express = require('express')
const {
  createDefectiveProduct,
  getAllDefectivesProducts
} = require('../controllers/productosDefectuosos.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const sellRoute = express.Router()

sellRoute.get('/', getAllDefectivesProducts)
// sellRoute.get('/report/', getSaleToReport)
// sellRoute.get('/:id', checkId, findSell)
sellRoute.post('/', createDefectiveProduct)
// sellRoute.delete('/:id', checkId, deleteSell)

module.exports = sellRoute
