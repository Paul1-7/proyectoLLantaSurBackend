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
const {
  CLIENTE,
  EMPLEADO_VENTAS,
  ADMINISTRADOR
} = require('../config/roles.js')

const favoriteRoute = express.Router()

favoriteRoute.get(
  '/:id',
  [verifyToken, checkRoles(CLIENTE.id, EMPLEADO_VENTAS.id, ADMINISTRADOR.id)],
  getAllFavoritesByIdClient
)

favoriteRoute.post(
  '/',
  [verifyToken, checkRoles(CLIENTE.id, EMPLEADO_VENTAS.id, ADMINISTRADOR.id)],
  createFavorite
)
favoriteRoute.delete(
  '/:id',
  [
    checkId,
    verifyToken,
    checkRoles(CLIENTE.id, EMPLEADO_VENTAS.id, ADMINISTRADOR.id)
  ],
  deleteFavorite
)

module.exports = favoriteRoute
