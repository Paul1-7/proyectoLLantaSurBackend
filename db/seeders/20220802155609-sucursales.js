module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Sucursales',
      [
        {
          id: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          nombre: 'Llanta sur - mercado Campesino',
          direccion: 'Av. panamericana',
          tel: '66-30187',
          estado: 1
        },
        {
          id: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          nombre: 'Llanta sur - mercado Abasto',
          direccion: 'Av. froilan tejerina',
          tel: '66-40168',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sucursales', null, {})
  }
}
