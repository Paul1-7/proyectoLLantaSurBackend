const { models } = require('../libs/sequelize.js')

async function addRolEmployee(idEmp, roles) {
  const dataRolEmployee = []
  roles.forEach((role) => {
    dataRolEmployee.push({ idEmp, ...role })
  })

  return await models.Roles_Empleados.bulkCreate(dataRolEmployee)
}

async function removeRolEmployee(idEmp) {
  return await models.Roles_Empleados.destroy({
    where: { idEmp }
  })
}

async function updateRolEmployee(idEmp, roles) {
  await removeRolEmployee(idEmp)
  return await addRolEmployee(idEmp, roles)
}

module.exports = {
  addRolEmployee,
  removeRolEmployee,
  updateRolEmployee
}
