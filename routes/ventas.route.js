const express = require('express')
const { checkId } = require('../middlewares/validator.handle.js')

const {
  getAllSells,
  findSell,
  createSell,
  getSaleToReport
} = require('../controllers/ventas.controller.js')

const sellRoute = express.Router()

sellRoute.get('/', getAllSells)
sellRoute.get('/report/', getSaleToReport)
sellRoute.get('/:id', checkId, findSell)
sellRoute.get('/:id', checkId, findSell)
sellRoute.post('/', createSell)
module.exports = sellRoute
