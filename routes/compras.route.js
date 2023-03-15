const express = require('express')
const { checkId } = require('../middlewares/validator.handle.js')

const {
  getAllPurchases,
  findPurchase,
  createPurchase,
  getPurchaseToReport
} = require('../controllers/compras.controller.js')

const purchaseRoute = express.Router()

purchaseRoute.get('/', getAllPurchases)
purchaseRoute.get('/report/', getPurchaseToReport)
purchaseRoute.get('/:id', checkId, findPurchase)
purchaseRoute.get('/:id', checkId, findPurchase)
purchaseRoute.post('/', createPurchase)
module.exports = purchaseRoute
