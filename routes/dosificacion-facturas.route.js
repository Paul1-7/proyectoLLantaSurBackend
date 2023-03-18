const express = require('express')
const { ADMINISTRADOR } = require('../config/roles')
const {
  getInvoiceBatching,
  updateInvoiceBatching
} = require('../controllers/dosificacionFacturas.controller')
const { verifyToken, checkRoles } = require('../middlewares/validator.handle')

const dosFactRoute = express.Router()

dosFactRoute.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  getInvoiceBatching
)
dosFactRoute.put(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  updateInvoiceBatching
)

module.exports = dosFactRoute
