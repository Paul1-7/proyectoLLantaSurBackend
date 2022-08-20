module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          id_rol: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          nombre_rol: 'Administrador',
          estado_rol: 1
        },
        {
          id_rol: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          nombre_rol: 'Empleado de ventas',
          estado_rol: 1
        },
        {
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b',
          nombre_rol: 'Cliente',
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
