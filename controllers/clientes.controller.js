const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { findRolByName } = require('../services/roles.service.js')
const {
  addRolUser,
  removeRolUser
} = require('../services/rolesUsuarios.service.js')
const services = require('../services/usuarios.service.js')
const { rolesName } = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Cliente no encontrado',
  delete: 'Cliente eliminado'
}

const { CLIENTE } = rolesName

const getAllCustomers = async (req, res, next) => {
  try {
    const customer = await services.getAllUsersByRol(CLIENTE)
    res.json(customer)
  } catch (error) {
    next(error)
  }
}

const findCustomer = async (req, res, next) => {
  try {
    const { id } = req.params
    const customer = await services.findUser(id)

    if (!customer) return ERROR_RESPONSE.notFound(msg.notFound, res)

    delete customer.dataValues.password

    res.json(customer)
  } catch (error) {
    next(error)
  }
}

const createCustomer = async (req, res, next) => {
  try {
    const { body } = req

    const user = await services.createUser(body)
    const rolClient = await findRolByName(rolesName.CLIENTE)
    const { idRol } = rolClient
    await addRolUser(user.dataValues.idUsuario, [{ idRol }])

    delete user.dataValues.password

    res.json(user)
  } catch (error) {
    next(error)
  }
}

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req

    const customer = await services.updateUser(id, body)

    if (!customer) return ERROR_RESPONSE.notFound(msg.notFound, res)

    delete customer.dataValues.password

    res.json(customer)
  } catch (error) {
    next(error)
  }
}

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params

    const rolUser = await removeRolUser(id)
    const customer = rolUser > 0 && (await services.deleteUser(id))

    if (!customer) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllCustomers,
  findCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
