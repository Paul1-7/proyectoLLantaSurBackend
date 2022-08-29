const express = require('express')
const { checkId } = require('../middlewares/validator.handle.js')

const {
  getAllSells,
  findSell,
  createSell,
  updateSell,
  deleteSell
} = require('../controllers/ventas.controller.js')

const sellRoute = express.Router()

sellRoute.get('/', getAllSells)
sellRoute.get('/:id', checkId, findSell)
sellRoute.post('/', createSell)
sellRoute.put('/:id', checkId, updateSell)
sellRoute.delete('/:id', checkId, deleteSell)

module.exports = sellRoute
