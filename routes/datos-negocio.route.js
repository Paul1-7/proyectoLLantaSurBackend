const express = require('express')
const {
  getBusinessData,
  updateBusinessData
} = require('../controllers/datosNeg.controller')

const datosNegRoute = express.Router()

datosNegRoute.get('/', getBusinessData)
datosNegRoute.put('/', updateBusinessData)

module.exports = datosNegRoute
