const express = require('express')
const usersRoute = require('./clientes.route.js')
const fs = require('fs')

const router = express.Router()

const PATH_ROUTES = `${__dirname}`

const removeExtension = (filename) => {
  return filename.split('.').shift()
}

function routerApi(app) {
  app.use('/api/v1/', router)
  //router.use('/usuarios', usersRoute)
  fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    if (name !== 'index') {
      router.use(`/${name}`, require(`./${file}`))
    }
  })
}

module.exports = routerApi
