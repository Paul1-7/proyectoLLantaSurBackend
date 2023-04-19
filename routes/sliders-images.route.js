const express = require('express')
const {
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const {
  getAllSlidersImages,
  updateSlidersImages
} = require('../controllers/slidersImages.controller.js')
const { ADMINISTRADOR } = require('../config/roles.js')

const categoryRoute = express.Router()

categoryRoute.get('/', getAllSlidersImages)
categoryRoute.put(
  '/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  updateSlidersImages
)

module.exports = categoryRoute
