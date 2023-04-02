const express = require('express')
const {
  checkId,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const {
  getAllFavoritesByIdClient,
  createFavorite,
  deleteFavorite
} = require('../controllers/favoritos.controller.js')
const { CLIENTE } = require('../config/roles.js')

const favoriteRoute = express.Router()

favoriteRoute.get(
  '/:id',
  [verifyToken, checkRoles(CLIENTE.id)],
  getAllFavoritesByIdClient
)

favoriteRoute.post('/', [verifyToken, checkRoles(CLIENTE.id)], createFavorite)
favoriteRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(CLIENTE.id)],
  deleteFavorite
)

module.exports = favoriteRoute
