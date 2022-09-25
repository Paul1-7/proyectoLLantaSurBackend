const msg = require('../utils/validationsMsg')

const ERROR_RESPONSE = {
  notFound: (msg, res) => {
    return res.status(404).json({ message: msg })
  },
  badRequest: (msg, res) => {
    return res.status(400).json({ message: msg })
  },
  notAcceptable: (msg, res) => {
    return res.status(406).json({ message: msg })
  }
}

const errorFilterByName = (errs, name) => {
  return errs.map((err) => err[name]).toString()
}

const sequelizeErrors = (errorMsg, errors, valueName) => {
  return {
    message: `${errorMsg} ${errorFilterByName(errors, valueName)}`
  }
}

function errorHandler(err, req, res, next) {
  console.log(err)
  if (err?.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      message: msg.msgUniqueValue(errorFilterByName(err.errors, 'path'))
    })
  }
  if (err?.name === 'SequelizeValidationError') {
    return res
      .status(500)
      .json(sequelizeErrors(msg.msgValidationError, err.errors, 'message'))
  }
  if (err?.name === 'SequelizeDatabaseError') {
    return res
      .status(500)
      .json({ message: 'ocurrio un error al guardar en la base de datos' })
  }

  return res.status(500).json(err)
}

module.exports = { errorHandler, ERROR_RESPONSE }
