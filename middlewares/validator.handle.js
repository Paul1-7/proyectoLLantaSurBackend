const { ERROR_RESPONSE } = require('./error.handle.js')

const msg = {
  isIdNumberValid: 'el id no es valido',
  notFoundId: 'el id no existe',
  notFoundRoles: 'no se encontraron roles en la peticion',
  isRolesValid: 'los roles no son validos',
  isImageTypeValid: 'la imagen no es valida',
  isImageSizeValid: 'la imagen no debe superar los 1.5mb'
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

function fileTypeCheck(req, res, next) {
  if (!req.files?.imagenProd) return next()
  const { mimetype } = req.files.imagenProd
  if (!mimetype) return next()

  const regex = /^image\/(jpeg|png)$/
  if (!regex.test(mimetype))
    return ERROR_RESPONSE.notAcceptable(msg.isImageTypeValid, res)
  next()
}

function fileSizeCheck(req, res, next) {
  if (!req.files?.imagenProd) return next()

  const { size } = req.files.imagenProd
  if (!size) return next()

  if (size > 1500000)
    return ERROR_RESPONSE.notAcceptable(msg.isImageSizeValid, res)
  next()
}

module.exports = { checkId, checkRolesBody, fileTypeCheck, fileSizeCheck }
