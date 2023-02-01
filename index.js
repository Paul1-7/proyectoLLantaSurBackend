require('dotenv').config()
require('./libs/sequelize.js')

const express = require('express')
const cors = require('cors')
const routerApi = require('./routes/index.js')
const { errorHandler } = require('./middlewares/error.handle.js')
const { PORT } = require('./config/config.js')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const whitelist = ['http://localhost:3000']
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('no permitido'))
//     }
//   }
// }
// app.use(cors(options))

app.use(cors())
routerApi(app)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
