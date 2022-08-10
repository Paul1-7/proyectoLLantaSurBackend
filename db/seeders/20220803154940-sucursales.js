module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Sucursales',
      [
        {
          nombre_suc: 'Llanta sur - mercado Campesino',
          direccion_suc: 'Av. panamericana',
          tel_suc: '66-30187',
          estado_suc: 1
        },
        {
          nombre_suc: 'Llanta sur - mercado Abasto',
          direccion_suc: 'Av. froilan tejerina',
          tel_suc: '66-40168',
          estado_suc: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
