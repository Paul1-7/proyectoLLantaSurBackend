const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

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

module.exports = {
  getAllUsers,
  findUser,
  createUser,
  updateUser,
  getAllUsersByRol
}
