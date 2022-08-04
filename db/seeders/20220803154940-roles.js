module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          nombre_rol: 'Administrador',
          estado_rol: 1
        },
        {
          nombre_rol: 'Empleado de ventas',
          estado_rol: 1
        },
        {
          nombre_rol: 'Cliente',
          estado_rol: 1
        },
        {
          nombre_rol: 'Invitado',
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
