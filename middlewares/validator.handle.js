const { ERROR_RESPONSE } = require('./error.handle')

const msg = {
  isIdNumberValid: 'el id no es valido',
  notFoundId: 'el id no existe',
  notFoundRoles: 'no se encontraron roles',
  isRolesValid: 'los roles no son validos'
}

function checkId(req, res, next) {
  const { id } = req.params
  if (!id) return ERROR_RESPONSE.notFound(msg.notFoundId, res)
  if (isNaN(Number(id)))
    return ERROR_RESPONSE.notAcceptable(msg.isIdNumberValid, res)
  next()
}

function checkRolesBody(req, res, next) {
  const { body } = req
  const { roles } = body

  const regexRol = /\[\{[\{\w+\:\"\}\,]*\}\]/

  if (!roles) return ERROR_RESPONSE.notFound(msg.notFoundRoles, res)

  if (regexRol.test(roles))
    return ERROR_RESPONSE.notAcceptable(msg.isRolesValid, res)

  next()
}

module.exports = { checkId, checkRolesBody }
