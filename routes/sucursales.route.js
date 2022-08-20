const express = require('express')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { checkId } = require('../middlewares/validator.handle.js')
const {
  getAllSubsidiaries,
  findSubsidiary,
  createSubsidiary,
  updateSubsidiary,
  deleteSubsidiary
} = require('../services/sucursales.service.js')

const subsidiaryRoute = express.Router()

const msg = {
  notFound: 'Sucursal no encontrada',
  delete: 'Sucursal eliminada'
}

subsidiaryRoute.get('/', async (req, res, next) => {
  try {
    const subsidiary = await getAllSubsidiaries()
    res.json(subsidiary)
  } catch (error) {
    next(error)
  }
})

subsidiaryRoute.get('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const subsidiary = await findSubsidiary(id)

    if (!subsidiary) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(subsidiary)
  } catch (error) {
    next(error)
  }
})

subsidiaryRoute.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const subsidiary = await createSubsidiary(body)
    res.json(subsidiary)
  } catch (error) {
    next(error)
  }
})

subsidiaryRoute.put('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const subsidiary = await updateSubsidiary(id, body)

    if (!subsidiary) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(subsidiary)
  } catch (error) {
    next(error)
  }
})

subsidiaryRoute.delete('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const subsidiary = await deleteSubsidiary(id)

    if (!subsidiary) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
})

module.exports = subsidiaryRoute
