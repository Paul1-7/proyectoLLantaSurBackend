const express = require('express')
const { ADMINISTRADOR } = require('../config/roles.js')
const {
  getAllSubsidiaries,
  findSubsidiary,
  createSubsidiary,
  updateSubsidiary,
  deleteSubsidiary
} = require('../controllers/sucursales.controller.js')
const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const subsidiaryRoute = express.Router()

subsidiaryRoute.get(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  getAllSubsidiaries
)

subsidiaryRoute.get(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  findSubsidiary
)

subsidiaryRoute.post(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  createSubsidiary
)

subsidiaryRoute.put(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  updateSubsidiary
)

subsidiaryRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  deleteSubsidiary
)

module.exports = subsidiaryRoute
