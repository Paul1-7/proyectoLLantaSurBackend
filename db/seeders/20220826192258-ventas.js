module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Ventas',
      [
        {
          id: '54a4b3f3-da45-4645-8ad7-1a3d37b64272',
          cod_venta: 6800,
          total: 20.5,
          cod_referencia: 'V-20220527-0001',
          fecha: '2022-05-27',
          id_vendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_cliente: 'd71ac730-e43b-4c9c-a480-164f9c630e07',
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ventas', null, {})
  }
}
