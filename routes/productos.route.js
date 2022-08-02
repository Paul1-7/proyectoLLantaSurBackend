const express = require('express')
//const { getAllUsers, findUser } = require('../services/usuarios.service.js')

const usersRoute = express.Router()

usersRoute.get('/', async (req, res, next) => {
  try {
    //const users = await getAllUsers()
    //const users = await service.getAllUsers()
    res.json('hola productos')
  } catch (error) {
    next(error)
  }
})

module.exports = usersRoute
