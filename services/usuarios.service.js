const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')
const { removeRolUser } = require('./rolesUsuarios.service.js')

async function getAllUsers() {
  return await models.Usuarios.findAll()
}

async function getAllUsersByRol(active = false, ...rolNames) {
  const options = {
    where: {
      '$roles.nombre_rol$': { [Op.in]: rolNames }
    },
    include: 'roles'
  }

  if (active) options.where.estado = 1

  return await models.Usuarios.findAll(options)
}

async function findUser(id) {
  return await models.Usuarios.findByPk(id, {
    include: ['roles']
  })
}
async function findUserByOptions(options = {}) {
  return await models.Usuarios.findOne({
    attributes: [
      'idUsuario',
      'nombre',
      'apellido',
      'password',
      'celular',
      'email'
    ],
    include: [
      {
        model: models.Roles,
        as: 'roles',
        attributes: ['idRol'],
        through: {
          attributes: []
        }
      },
      {
        model: models.Sucursales,
        as: 'sucursal',
        attributes: ['id', 'nombre']
      }
    ],
    ...options
  })
}

async function createUser(User) {
  return await models.Usuarios.create(User)
}

async function updateUser(id, changes) {
  const { password } = changes

  const user = await models.Usuarios.findByPk(id)
  const newPassword =
    password.length === 0 ? JSON.stringify(user).password : password

  return await user?.update({ ...changes, password: newPassword })
}

async function deleteUser(id) {
  const user = await models.Usuarios.findByPk(id, {
    include: ['compras', 'ventasVendedor', 'ventasCliente', 'favoritos']
  })
  if (
    user.compras.length > 0 ||
    user.ventasVendedor.length > 0 ||
    user.ventasCliente.length > 0 ||
    user.favoritos.length > 0
  )
    return new Error(msg.msgErrorForeignKey)

  await removeRolUser(id)
  return await user?.destroy()
}

module.exports = {
  getAllUsers,
  findUser,
  createUser,
  updateUser,
  getAllUsersByRol,
  findUserByOptions,
  deleteUser
}
