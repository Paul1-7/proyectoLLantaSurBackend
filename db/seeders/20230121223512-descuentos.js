'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Descuentos',
      [
        {
          id: '0a1d54e3-1db2-4c76-8bb0-3029d183aece',
          nombre: 'Descuentos de fin de año',
          fecha_inicio: '01-10-2023',
          fecha_fin: '11-12-2025',
          estado: 1
        },
        {
          id: 'de1a9b89-3d81-423c-892e-e9ce61b27ebc',
          nombre: 'Descuentos hasta agotar stock',
          fecha_inicio: '01-01-2023',
          fecha_fin: '06-11-2026',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Descuentos', null, {})
  }
}
