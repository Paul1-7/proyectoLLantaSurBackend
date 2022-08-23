const express = require('express')
const {
  getAllUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/usuarios.controller.js')

const {
  checkId,
  checkBodyParams
} = require('../middlewares/validator.handle.js')

const userRoute = express.Router()

userRoute.get('/', getAllUsers)

userRoute.get('/:id', checkId, findUser)

userRoute.post('/', checkBodyParams('roles'), createUser)

userRoute.put('/:id', checkId, checkBodyParams('roles'), updateUser)

userRoute.delete('/:id', checkId, deleteUser)

module.exports = userRoute
