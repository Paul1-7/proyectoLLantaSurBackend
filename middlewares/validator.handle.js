const { ERROR_RESPONSE } = require('./error.handle')

const msg = {
  isNumberId: 'el id no es valido',
  notFound: 'el id no existe'
}

function checkId(req, res, next) {
  const { id } = req.params
  if (!id) return ERROR_RESPONSE.badRequest(msg.notFound, res)
  if (isNaN(Number(id))) return ERROR_RESPONSE.badRequest(msg.isNumberId, res)

  next()
}

module.exports = { checkId }
