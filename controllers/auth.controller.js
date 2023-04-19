const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const userServices = require('../services/usuarios.service.js')
const jwt = require('jsonwebtoken')
const { emailRegex } = require('../constants/index.js')
const {
  KEY_JWT,
  KEY_JWT_REFRESH,
  URL_BASE_FRONTEND
} = require('../config/config.js')
const { CLIENTE } = require('../config/roles.js')
const { compare, hash } = require('bcrypt')
const sendEmail = require('../libs/sendEmail.js')

const msg = {
  notFound: 'No se encuentra la información solicitada',
  notSentData: 'No se envío la información',
  invalidCredentials: 'El usuario y/o contraseñas no son validos',
  invalidRefreshToken: 'El token para el refresco es inválido',
  logoutSuccess: 'Cerraste la sesión correctamente',
  emailSent: 'Se envio el correo de recuperación, revisa tu bandeja',
  resetPasswordSuccess: 'Se reestablecio correctamente tu contraseña',
  invalidToken: 'El token no es valido'
}

function generateAccessToken(user) {
  const expiresIn =
    user.roles.length === 1 && user.roles.includes(CLIENTE.id) ? '2h' : '2h'

  return jwt.sign(
    {
      idUsuario: user.idUsuario,
      nombre: user.nombre,
      apellido: user.apellido,
      roles: user.roles,
      sucursal: user.sucursal
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
      roles: user.roles,
      sucursal: user.sucursal
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
    return res.json({ user: newUser, accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
}

const verifyPhoneNumber = async (req, res, next) => {
  try {
    const { celular } = req.body
    const options = { where: { celular } }

    if (!celular) return ERROR_RESPONSE.notFound(msg.notSentData, res)

    const user = await userServices.findUserByOptions(options)
    if (!user) {
      return res.json({ message: msg.notFound })
    }

    return res.json({ celular: user.celular })
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  try {
    const { token } = req.body

    if (!token) return ERROR_RESPONSE.notFound(msg.notSentData, res)

    refreshTokens = refreshTokens.filter(
      (tokenRefresh) => tokenRefresh !== token
    )

    return res.status(200).json({ message: msg.logoutSuccess })
  } catch (error) {
    next(error)
  }
}

const passwordReset = async (req, res, next) => {
  try {
    const { email } = req.body
    const options = { where: { email } }

    const user = await userServices.findUserByOptions(options)
    if (!user) {
      return res.json({ message: msg.notFound })
    }

    const token = jwt.sign(
      {
        celular: user.dataValues.celular
      },
      KEY_JWT,
      { expiresIn: '5m' }
    )

    const tokenParsed = token.replace('.', 'á')
    console.log('TCL: passwordReset -> tokenParsed', tokenParsed)

    const link = `${URL_BASE_FRONTEND}/recuperar-contraseña/${user.dataValues.idUsuario}/${tokenParsed}`
    await sendEmail(user.dataValues.email, 'Reestablecer contraseña', link)
    return res.json({ message: msg.emailSent })
  } catch (error) {
    next(error)
  }
}

const passwordResetValidateRequest = async (req, res, next) => {
  try {
    const { userId, token } = req.params
    const newPassword = req.body.password

    const tokenParsed = token.replace('á', '.')

    jwt.verify(tokenParsed, KEY_JWT, (err, user) => {
      if (err) return ERROR_RESPONSE.forbidden(msg.invalidToken, res)
    })
    const user = await userServices.findUser(userId)
    if (!user) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const passwordHashed = await hash(newPassword, 10)
    await user.update({ ...user.dataValues, password: passwordHashed })

    return res.json({ message: msg.resetPasswordSuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  loginUser,
  refreshToken,
  logoutUser,
  verifyPhoneNumber,
  passwordReset,
  passwordResetValidateRequest
}
