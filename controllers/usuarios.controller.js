const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const userServices = require('../services/usuarios.service.js')
const jwt = require('jsonwebtoken')
const { emailRegex } = require('../constants/index.js')
const { KEY_JWT } = require('../config/config.js')
const { CLIENTE } = require('../config/roles.js')

const msg = {
  notFound: 'No se envío el token',
  invalidCredentials: 'El usuario y/o contraseñas no son validos'
}

const refreshToken = async (req, res, next) => {
  const { token } = req.body ?? {}

  if (!token) return ERROR_RESPONSE.notFound(msg.notFound, res)
}

const loginUser = async (req, res, next) => {
  try {
    const { usuario, password } = req.body
    const isValidEmail = emailRegex.test(usuario)
    const options = {
      where: {
        password
      }
    }

    if (isValidEmail) {
      options.where.email = usuario
    } else {
      options.where.usuario = usuario
    }
    const user = await userServices.findUserByOptions(options)

    if (!user) return ERROR_RESPONSE.unauthorized(msg.invalidCredentials, res)

    const roles = user.roles.map(({ idRol }) => idRol)
    const expiresIn =
      roles.length === 1 && roles.includes(CLIENTE.id) ? '1y' : '15m'

    const accessToken = jwt.sign(
      {
        id: user.idUsuario,
        roles
      },
      KEY_JWT,
      { expiresIn }
    )

    res.json({ user, accessToken })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  loginUser,
  refreshToken
}
