'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles_Empleados',
      [
        { id_emp: 1, id_rol: 1 },
        { id_emp: 1, id_rol: 2 },
        { id_emp: 2, id_rol: 3 }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles_Empleados', null, {})
  }
}
