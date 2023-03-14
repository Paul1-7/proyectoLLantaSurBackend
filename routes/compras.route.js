const express = require('express')
const { checkId } = require('../middlewares/validator.handle.js')

const {
  getAllPurchases,
  findPurchase,
  createPurchase,
  getPurchaseToReport
} = require('../controllers/compras.controller.js')

const sellRoute = express.Router()

sellRoute.get('/', getAllPurchases)
sellRoute.get('/report/', getPurchaseToReport)
sellRoute.get('/:id', checkId, findPurchase)
sellRoute.get('/:id', checkId, findPurchase)
sellRoute.post('/', createPurchase)
module.exports = sellRoute
