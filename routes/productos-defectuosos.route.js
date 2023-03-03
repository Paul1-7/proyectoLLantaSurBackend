const express = require('express')
const {
  createDefectiveProduct,
  getAllDefectivesProducts,
  getAllDefectivesProductsBySale,
  deleteDefectiveProduct
} = require('../controllers/productosDefectuosos.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const defectiveProducts = express.Router()

defectiveProducts.get('/', getAllDefectivesProducts)
defectiveProducts.get('/ventas/:id', checkId, getAllDefectivesProductsBySale)
defectiveProducts.post('/', createDefectiveProduct)
defectiveProducts.delete('/:id', checkId, deleteDefectiveProduct)

module.exports = defectiveProducts
