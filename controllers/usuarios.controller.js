const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { findRol, getAllRols } = require('../services/roles.service.js')
const { addRolUser } = require('../services/rolesUsuarios.service.js')
const { findSubsidiary } = require('../services/sucursales.service.js')
const userServices = require('../services/usuarios.service.js')

const msg = {
  userNotFound: 'Usuario no encontrado',
  subsidiaryNotFound: 'Sucursal no encontrada',
  rolNotFound: 'Rol no encontrado',
  delete: 'Usuario eliminado'
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userServices.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const findUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userServices.findUser(id)

    if (!user) return ERROR_RESPONSE.notFound(msg.userNotFound, res)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

const verifyRoles = async (roles) => {
  const allRoles = await getAllRols()
  const target = roles.map((rol) => rol.id)
  const allIdRoles = allRoles.map((rol) => rol.id)

  return target.every((rol) => allIdRoles.includes(rol))
}

const createUser = async (req, res, next) => {
  try {
    const { body } = req
    const { roles, ...dataUser } = body

    const subsidiary = await findSubsidiary(dataUser.idSuc)
    if (!subsidiary) return ERROR_RESPONSE.notFound(msg.subsidiaryNotFound, res)

    const existRoles = await verifyRoles(roles)
    if (!existRoles) return ERROR_RESPONSE.notFound(msg.rolNotFound, res)

    const user = await userServices.createUser(dataUser)
    await addRolUser(user.idUsuario, roles)

    delete user.dataValues.password

    res.json(user)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const { roles, ...dataUser } = body

    const user = await userServices.updateUser(id, dataUser)

    if (!user) return ERROR_RESPONSE.notFound(msg.userNotFound, res)

    res.json(user)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await empServices.deleteEmplooye(id)

    if (!user) return ERROR_RESPONSE.notFound(msg.userNotFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser
}
