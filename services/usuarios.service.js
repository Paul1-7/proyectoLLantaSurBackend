const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function getAllUsers() {
  return await models.Usuarios.findAll()
}

async function getAllUsersByRol(...rolNames) {
  return await models.Usuarios.findAll({
    where: {
      '$roles.nombre_rol$': { [Op.in]: rolNames }
    },
    include: 'roles'
  })
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
  const User = await models.Usuarios.findByPk(id)
  return await User?.update(changes)
}

async function deleteUser(id) {
  const User = await models.Usuarios.findByPk(id)
  return await User?.destroy()
}

module.exports = {
  getAllUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  getAllUsersByRol
}
