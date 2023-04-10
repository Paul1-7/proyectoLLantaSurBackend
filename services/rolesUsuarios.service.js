const { models } = require('../libs/sequelize.js')

async function addRolUser(idUsuario, roles) {
  const dataRolUser = []
  roles.forEach((role) => {
    dataRolUser.push({ idUsuario, ...role })
  })

  return await models.RolesUsuarios.bulkCreate(dataRolUser)
}

async function removeRolUser(idUsuario) {
  return await models.RolesUsuarios.destroy({
    where: { idUsuario }
  })
}

async function updateRolUser(idUsuario, roles) {
  await removeRolUser(idUsuario)
  return await addRolUser(idUsuario, roles)
}

module.exports = {
  addRolUser,
  removeRolUser,
  updateRolUser
}
