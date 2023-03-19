const { hash } = require('bcrypt')
const { CLIENTE } = require('../config/roles.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { findRolByName } = require('../services/roles.service.js')
const { addRolUser } = require('../services/rolesUsuarios.service.js')
const services = require('../services/usuarios.service.js')

const msg = {
  notFound: 'Cliente no encontrado',
  delete: 'Se elimino el empleado correctamente',
  addSuccess: 'Se registró el cliente correctamente',
  modifySuccess: 'Se actualizó el registró del cliente correctamente'
}

const userDataIsEmpty = (user) => {
  const { email, usuario } = user

  if (email.trim().length === 0) return true
  if (usuario.trim().length === 0) return true

  return false
}

const fillUserDataByDefault = (user) => {
  const { ciNit, celular } = user
  ;(user.usuario = ciNit), (user.password = celular)
  user.email = null
  return user
}

const getAllCustomers = async (req, res, next) => {
  try {
    const isActive = false
    const customer = await services.getAllUsersByRol(isActive, CLIENTE.name)
    res.json(customer)
  } catch (error) {
    next(error)
  }
}

const getAllActivesCustomers = async (req, res, next) => {
  try {
    const isActive = true
    const customer = await services.getAllUsersByRol(isActive, CLIENTE.name)
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
      user = fillUserDataByDefault(user)
    }

    const passwordHashed = await hash(user.password.toString(), 10)
    const newUser = await services.createUser({
      ...user,
      password: passwordHashed
    })

    const rolClient = await findRolByName(CLIENTE.name)
    const { idRol } = rolClient

    await addRolUser(newUser.dataValues.idUsuario, [{ idRol }])

    res.json({ message: msg.addSuccess })
    return
  } catch (error) {
    next(error)
  }
}

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params
    let user = req.body

    if (user.password !== '') {
      const passwordHashed = await hash(user.password.toString(), 10)
      user = { ...user, password: passwordHashed }
    }

    const customer = await services.updateUser(id, user)

    if (!customer) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params
    const existCustomer = await services.findUser(id)
    if (!existCustomer) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const customerDeleted = await services.deleteUser(id)

    if (customerDeleted instanceof Error)
      return ERROR_RESPONSE.notAcceptable(customerDeleted.message, res)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllCustomers,
  findCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getAllActivesCustomers
}
