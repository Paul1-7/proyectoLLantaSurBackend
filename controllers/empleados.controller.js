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
  rolNotFound: 'Rol no encontrado'
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

    if (!areValidData(allRoles, roles, 'idRol', 'idRol'))
      return ERROR_RESPONSE.notFound(msg.rolNotFound, res)

    if (!existClientRol(allRoles, roles)) {
      const clientRol = allRoles.find(
        (rol) => rol.nombreRol === rolesName.CLIENTE
      )
      roles = [...roles, { idRol: clientRol.idRol }]
    }

    const user = await userServices.createUser(dataUser)

    await addRolUser(user.dataValues.idUsuario, roles)

    delete user.dataValues.password

    res.json(user)
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

    if (!areValidData(allRoles, roles, 'idRol', 'idRol'))
      return ERROR_RESPONSE.notFound(msg.rolNotFound, res)

    if (!existClientRol(allRoles, roles)) {
      const clientRol = allRoles.find(
        (rol) => rol.nombreRol === rolesName.CLIENTE
      )
      roles = [...roles, { idRol: clientRol.idRol }]
    }

    const employe = await userServices.updateUser(id, dataEmployee)
    await updateRolUser(employe.dataValues.idUsuario, roles)

    if (!employe) return ERROR_RESPONSE.notFound(msg.notFound, res)

    delete employe.dataValues.password
    res.json(employe)
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
