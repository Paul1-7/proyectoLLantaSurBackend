'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'SucursalesProductosCompras',
      [
        {
          id: '99a1fd10-97ba-4145-86f8-b723b2fc2d45',
          stock: 4,
          id_suc_prod: 'acf67796-d2d2-4beb-8a0e-cd837045aecd',
          id_compra: '54a4b3f3-da45-4645-8ad7-1a3d37b64272'
        },
        {
          id: '0492ac03-bf93-45a0-881d-4a7b6efb7232',
          stock: 6,
          id_suc_prod: '23f330d7-7ec7-4316-a000-31132d08973a',
          id_compra: '54a4b3f3-da45-4645-8ad7-1a3d37b64272'
        },
        {
          id: '48eaa9b6-d873-47a9-9404-ef6036d4f95a',
          stock: 3,
          id_suc_prod: '0492ac03-bf93-45a0-881d-4a7b6efb7232',
          id_compra: '54a4b3f3-da45-4645-8ad7-1a3d37b64272'
        },
        {
          id: 'dd2f4ffc-4cde-4b7f-a573-b94c1b9c5c18',
          stock: 2,
          id_suc_prod: '041d30d8-3915-4a81-a770-50e78017d4e3',
          id_compra: '54a4b3f3-da45-4645-8ad7-1a3d37b64272'
        },
        {
          id: 'b1fbd0b6-5d83-48a7-ae12-151360249ccd',
          stock: 12,
          id_suc_prod: 'c99827dd-b13a-47ef-8c37-e8ffbf0b0384',
          id_compra: '721e8d0e-3a0d-4d62-ae8a-e2df0054e1e7'
        },
        {
          id: 'e0fa9d78-d075-41f7-9f50-4220f787d91e',
          stock: 12,
          id_suc_prod: '67b65a7c-bc71-47c2-a35d-65bd4c1505ca',
          id_compra: '721e8d0e-3a0d-4d62-ae8a-e2df0054e1e7'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SucursalesProductosCompras', null, {})
  }
}
