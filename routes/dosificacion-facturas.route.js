const express = require('express')
const {
  getInvoiceBatching,
  updateInvoiceBatching
} = require('../controllers/dosificacionFacturas.controller')

const dosFactRoute = express.Router()

dosFactRoute.get('/', getInvoiceBatching)
dosFactRoute.put('/', updateInvoiceBatching)

module.exports = dosFactRoute
