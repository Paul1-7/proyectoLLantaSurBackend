'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Detalle_Compras',
      [
        {
          id: '3e91a847-0f23-486b-b5b7-365f57251265',
          id_compra: '54a4b3f3-da45-4645-8ad7-1a3d37b64272',
          id_prod: 'fa4eebc4-b6fc-4028-a027-0e7a5477372e',
          cantidad: 10,
          precio: 232.2,
          subtotal: 2322
        },
        {
          id: 'e0fa9d78-d075-41f7-9f50-4220f787d91e',
          id_compra: '54a4b3f3-da45-4645-8ad7-1a3d37b64272',
          id_prod: '14f23bde-837c-4f51-bb6a-2ddce96f4728',
          cantidad: 5,
          precio: 28,
          subtotal: 150
        },
        {
          id: 'b1fbd0b6-5d83-48a7-ae12-151360249ccd',
          id_compra: '721e8d0e-3a0d-4d62-ae8a-e2df0054e1e7',
          id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df',
          cantidad: 24,
          precio: 36,
          subtotal: 1500
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detalle_Compras', null, {})
  }
}
