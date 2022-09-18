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
  console.log('TCL: errorFilterByName -> errs', errs)

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
    res
      .status(500)
      .json(sequelizeErrors(msg.msgUniqueValue, err.errors, 'path'))
  }
  if (err?.name === 'SequelizeValidationError') {
    res
      .status(500)
      .json(sequelizeErrors(msg.msgValidationError, err.errors, 'message'))
  }

  res.status(500).json(err)
}

module.exports = { errorHandler, ERROR_RESPONSE }
