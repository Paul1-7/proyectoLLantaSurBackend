const express = require('express')
const {
  createDefectiveProduct,
  getAllDefectivesProducts,
  getAllDefectivesProductsBySale
} = require('../controllers/productosDefectuosos.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const defectiveProducts = express.Router()

defectiveProducts.get('/', getAllDefectivesProducts)
// defectiveProducts.get('/report/', getSaleToReport)
// defectiveProducts.get('/:id', checkId, findSell)
defectiveProducts.get('/ventas/:id', checkId, getAllDefectivesProductsBySale)
defectiveProducts.post('/', createDefectiveProduct)
// defectiveProducts.delete('/:id', checkId, deleteSell)

module.exports = defectiveProducts
