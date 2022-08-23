const express = require('express')
const {
  getAllSubsidiaries,
  findSubsidiary,
  createSubsidiary,
  updateSubsidiary,
  deleteSubsidiary
} = require('../controllers/sucursales.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')

const subsidiaryRoute = express.Router()

subsidiaryRoute.get('/', getAllSubsidiaries)

subsidiaryRoute.get('/:id', checkId, findSubsidiary)

subsidiaryRoute.post('/', createSubsidiary)

subsidiaryRoute.put('/:id', checkId, updateSubsidiary)

subsidiaryRoute.delete('/:id', checkId, deleteSubsidiary)

module.exports = subsidiaryRoute
