module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Sucursales',
      [
        {
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          nombre_suc: 'Llanta sur - mercado Campesino',
          direccion_suc: 'Av. panamericana',
          tel_suc: '66-30187',
          estado_suc: 1
        },
        {
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
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
