const { hash } = require('bcrypt')
const {
  CLIENTE,
  EMPLEADO_VENTAS,
  ADMINISTRADOR
} = require('../config/roles.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { getAllRols } = require('../services/roles.service.js')
const {
  addRolUser,
  updateRolUser
} = require('../services/rolesUsuarios.service.js')
const userServices = require('../services/usuarios.service.js')
const { areValidData, existClientRol } = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Empleado no encontrado',
  delete: 'Se elimino el empleado correctamente',
  rolNotFound: 'Rol no encontrado',
  addSuccess: 'Se registró el empleado correctamente',
  updateSuccess: 'Se actualizó el registró del empleado correctamente'
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

const getAllEmployees = async (req, res, next) => {
  try {
    const isActive = false
    const employe = await userServices.getAllUsersByRol(
      isActive,
      EMPLEADO_VENTAS.name,
      ADMINISTRADOR.name,
      CLIENTE.name
    )
    res.json(employe)
  } catch (error) {
    next(error)
  }
}

const findEmployee = async (req, res, next) => {
  try {
    const { id } = req.params
    const employee = await userServices.findUser(id)

    if (!employee) return ERROR_RESPONSE.notFound(msg.notFound, res)

    delete employee.dataValues.password

    res.json(employee)
  } catch (error) {
    next(error)
  }
}

const createEmployee = async (req, res, next) => {
  try {
    const { body } = req
    let { roles, ...dataUser } = body

    const allRoles = await getAllRols()

    if (!areValidData(allRoles, roles, 'idRol'))
      return ERROR_RESPONSE.notFound(msg.rolNotFound, res)

    roles = roles.map((rol) => ({ idRol: rol }))
    if (!existClientRol(allRoles, roles)) {
      const clientRol = allRoles.find((rol) => rol.nombreRol === CLIENTE.name)
      roles = [...roles, { idRol: clientRol.idRol }]
    }
    if (userDataIsEmpty(dataUser)) {
      dataUser = fillUserDataByDefault(dataUser)
    }

    const passwordHashed = await hash(dataUser.password.toString(), 10)
    const user = await userServices.createUser({
      ...dataUser,
      password: passwordHashed
    })

    await addRolUser(user.dataValues.idUsuario, roles)

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    let { roles, ...dataEmployee } = body

    const allRoles = await getAllRols()

    if (!areValidData(allRoles, roles, 'idRol'))
      return ERROR_RESPONSE.notFound(msg.rolNotFound, res)

    roles = roles.map((rol) => ({ idRol: rol }))
    if (!existClientRol(allRoles, roles)) {
      const clientRol = allRoles.find((rol) => rol.nombreRol === CLIENTE.name)
      roles = [...roles, { idRol: clientRol.idRol }]
    }

    if (dataEmployee.password !== '') {
      const passwordHashed = await hash(dataEmployee.password.toString(), 10)
      dataEmployee = { ...dataEmployee, password: passwordHashed }
    }

    const employe = await userServices.updateUser(id, dataEmployee)
    await updateRolUser(employe.dataValues.idUsuario, roles)

    if (!employe) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.updateSuccess })
  } catch (error) {
    next(error)
  }
}

const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params
    const existEmployee = await userServices.findUser(id)
    if (!existEmployee) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const employeeDeleted = await userServices.deleteUser(id)

    if (employeeDeleted instanceof Error)
      return ERROR_RESPONSE.notAcceptable(employeeDeleted.message, res)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllEmployees,
  findEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
}
