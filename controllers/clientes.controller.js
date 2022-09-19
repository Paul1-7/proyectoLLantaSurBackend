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
  delete: 'Cliente eliminado',
  success: 'Se registro con exito al cliente'
}

const { CLIENTE } = rolesName

const userDataIsEmpty = (user) => {
  const { email, password, usuario } = user

  if (email.trim().length === 0) return true
  if (password.trim().length === 0) return true
  if (usuario.trim().length === 0) return true

  return false
}

const fillUserDataByDefault = (user) => {
  const { ciNit, celular } = user
  ;(user.usuario = ciNit), (user.password = celular)

  return user
}

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
    return
  } catch (error) {
    next(error)
  }
}

const createCustomer = async (req, res, next) => {
  try {
    let user = req.body

    if (userDataIsEmpty(user)) {
      console.log('TCL: createCustomer -> user1', user)

      user = fillUserDataByDefault(user)
      console.log('TCL: createCustomer -> user2', user)
    }
    const newUser = await services.createUser(user)
    const rolClient = await findRolByName(rolesName.CLIENTE)
    const { idRol } = rolClient

    await addRolUser(newUser.dataValues.idUsuario, [{ idRol }])

    res.json({ message: msg.success })
    return
  } catch (error) {
    next(error)
  }
}

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params
    let user = req.body

    if (userDataIsEmpty(user)) {
      user = fillUserDataByDefault(user)
    }
    const customer = await services.updateUser(id, user)

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
    const customer = await services.findUser(id)
    if (!customer) return ERROR_RESPONSE.notFound(msg.notFound, res)
    customer.estado = 0
    customer.save()

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
