const express = require('express')
const cors = require('cors')
const sequelize = require('./libs/sequelize.js')
const routerApi = require('./routes/index.js')
const { errorHandler } = require('./middlewares/error.handle.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const whitelist = ['http://localhost:3000']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

app.get('/', async (req, res) => {
  try {
    const rta = await sequelize.query('SELECT * FROM task')
    res.send(rta)
  } catch (error) {
    console.log(error)
  }
  res.send('Hola mi server en express')
})

routerApi(app)

// app.use(ormErrorHandler)
// app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
