const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const userServices = require('../services/usuarios.service.js')
const jwt = require('jsonwebtoken')
const { emailRegex } = require('../constants/index.js')
const { KEY_JWT, KEY_JWT_REFRESH } = require('../config/config.js')
const { CLIENTE } = require('../config/roles.js')
const { compare } = require('bcrypt')

const msg = {
  notFound: 'No se encuentra la información solicitada',
  notSentData: 'No se envío la información',
  invalidCredentials: 'El usuario y/o contraseñas no son validos',
  invalidRefreshToken: 'El token para el refresco es inválido',
  logoutSuccess: 'Cerraste la sesión correctamente'
}

function generateAccessToken(user) {
  const expiresIn =
    user.roles.length === 1 && user.roles.includes(CLIENTE.id) ? '15m' : '15m'

  return jwt.sign(
    {
      idUsuario: user.idUsuario,
      nombre: user.nombre,
      apellido: user.apellido,
      roles: user.roles
    },
    KEY_JWT,
    { expiresIn }
  )
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      idUsuario: user.idUsuario,
      nombre: user.nombre,
      apellido: user.apellido,
      roles: user.roles
    },
    KEY_JWT_REFRESH
  )
}

let refreshTokens = []

const refreshToken = async (req, res, next) => {
  const { token } = req.body ?? {}

  if (!token) return ERROR_RESPONSE.notFound(msg.notSentData, res)

  if (!refreshTokens.includes(token))
    return ERROR_RESPONSE.forbidden(msg.invalidRefreshToken, res)

  jwt.verify(token, KEY_JWT_REFRESH, (err, user) => {
    refreshTokens = refreshTokens.filter(
      (tokenRefresh) => tokenRefresh !== token
    )

    const newAccessToken = generateAccessToken(user)
    const newRefreshAccessToken = generateRefreshToken(user)
    refreshTokens.push(newRefreshAccessToken)

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshAccessToken
    })
  })
}

const loginUser = async (req, res, next) => {
  try {
    const { usuario, password } = req.body
    const isValidEmail = emailRegex.test(usuario)
    const options = { where: { estado: 1 } }

    if (isValidEmail) {
      options.where.email = usuario
    } else {
      options.where.usuario = usuario
    }
    const user = await userServices.findUserByOptions(options)
    if (!user) return ERROR_RESPONSE.unauthorized(msg.invalidCredentials, res)

    const isValidPassword = await compare(password, user.password.toString())

    if (!isValidPassword)
      return ERROR_RESPONSE.unauthorized(msg.invalidCredentials, res)

    const roles = user.roles.map(({ idRol }) => idRol)

    delete user.dataValues.password
    const newUser = {
      ...user.toJSON(),
      roles
    }

    const accessToken = generateAccessToken(newUser)
    const refreshToken = generateRefreshToken(newUser)
    refreshTokens.push(refreshToken)

    res.json({ user: newUser, accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
}

const verifyPhoneNumber = async (req, res, next) => {
  const { celular } = req.body
  const options = { where: { estado: 1, celular } }

  if (!celular) return ERROR_RESPONSE.notFound(msg.notSentData, res)

  const user = await userServices.findUserByOptions(options)
  if (!user) return ERROR_RESPONSE.notFound(msg.notFound, res)

  res.json({ celular: user.celular })
}

const logoutUser = async (req, res, next) => {
  const { token } = req.body

  if (!token) return ERROR_RESPONSE.notFound(msg.notSentData, res)

  refreshTokens = refreshTokens.filter((tokenRefresh) => tokenRefresh !== token)

  res.status(200).json({ message: msg.logoutSuccess })
}

module.exports = {
  loginUser,
  refreshToken,
  logoutUser,
  verifyPhoneNumber
}
