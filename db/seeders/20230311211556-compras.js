'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Compras',
      [
        {
          id: '54a4b3f3-da45-4645-8ad7-1a3d37b64272',
          cod_compra: 6800,
          total: 20.5,
          fecha: '2022-05-27',
          id_prov: '0fa4dd51-931c-47e9-9e90-4b00f58169e0',
          id_emp: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76'
        },
        {
          id: '721e8d0e-3a0d-4d62-ae8a-e2df0054e1e7',
          cod_compra: 6801,
          total: 20.5,
          fecha: '2022-06-02',
          id_prov: 'ea9a46d6-3520-4f6c-8f53-7ba1afc82e7f',
          id_emp: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Compras', null, {})
  }
}
