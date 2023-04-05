module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Ventas',
      [
        {
          id: '54a4b3f3-da45-4645-8ad7-1a3d37b64272',
          cod_venta: 6800,
          total: 92.8,
          cod_referencia: 'V-20220527-0001',
          fecha: '2022-05-27',
          id_vendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_cliente: 'd71ac730-e43b-4c9c-a480-164f9c630e07',
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        },
        {
          id: '1a7d1c89-fd7e-4386-a8ad-357daecb7d80',
          cod_venta: 1010,
          cod_referencia: 'V-20230403-0002',
          fecha: '2023-04-03 22:22:07.165-04',
          total: 140.8,
          id_cliente: '567c0552-c250-4d69-bc54-482296a95e4b',
          id_vendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id: '5335ddb1-7065-4645-8df2-a4cd95c2c3d3',
          cod_venta: 1009,
          cod_referencia: 'V-20230403-0001',
          fecha: '2023-04-03 22:21:47.633-04',
          total: 140.8,
          id_cliente: '0bcea5bb-33f0-4a3d-b1df-0f63145ea252',
          id_vendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id: 'cf70c572-31c8-447b-92fa-6a975ade0ecf',
          cod_venta: 1011,
          cod_referencia: 'V-20230403-0003',
          fecha: '2023-03-04 00:00:00-04',
          total: 184.8,
          id_cliente: '8a84d79b-49d5-4c6a-8f9d-391c12aed841',
          id_vendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
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
