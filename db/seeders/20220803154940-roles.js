const {
  CLIENTE,
  ADMINISTRADOR,
  EMPLEADO_VENTAS
} = require('../../config/roles')

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          id_rol: ADMINISTRADOR.id,
          nombre_rol: ADMINISTRADOR.name,
          estado_rol: 1
        },
        {
          id_rol: EMPLEADO_VENTAS.id,
          nombre_rol: EMPLEADO_VENTAS.name,
          estado_rol: 1
        },
        {
          id_rol: CLIENTE.id,
          nombre_rol: CLIENTE.name,
          estado_rol: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
