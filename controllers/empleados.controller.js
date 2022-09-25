const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { getAllRols } = require('../services/roles.service.js')
const {
  addRolUser,
  updateRolUser,
  removeRolUser
} = require('../services/rolesUsuarios.service.js')
const userServices = require('../services/usuarios.service.js')
const {
  rolesName,
  areValidData,
  existClientRol
} = require('../utils/dataHandler.js')

const { EMPLEADO_VENTAS, ADMINISTRADOR } = rolesName
const msg = {
  notFound: 'Empleado no encontrado',
  delete: 'Empleado eliminado',
  rolNotFound: 'Rol no encontrado',
  addSuccess: 'Se registro el empleado correctamente',
  updateSuccess: 'Se actualizo el registro del cliente correctamente'
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
      EMPLEADO_VENTAS,
      ADMINISTRADOR
    )
    res.json(employe)
  } catch (error) {
    next(error)
  }
}

const findEmployee = async (req, res, next) => {
  try {
    const { id } = req.params
    const employe = await userServices.findUser(id)

    if (!employe) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(employe)
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
      const clientRol = allRoles.find(
        (rol) => rol.nombreRol === rolesName.CLIENTE
      )
      roles = [...roles, { idRol: clientRol.idRol }]
    }
    if (userDataIsEmpty(dataUser)) {
      dataUser = fillUserDataByDefault(dataUser)
    }

    const user = await userServices.createUser(dataUser)

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
      const clientRol = allRoles.find(
        (rol) => rol.nombreRol === rolesName.CLIENTE
      )
      roles = [...roles, { idRol: clientRol.idRol }]
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

    await removeRolUser(id)
    await userServices.deleteUser(id)

    res.json({ message: msg.delete })
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
