'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Dosificacion_Facturas',
      [
        {
          id: '52c112c4-c939-400d-b26e-b65c59749d36',
          num_autorizacion: '2584046000004536',
          num_fact_inicial: 1000,
          llave_dosificacion: '16ase81ca9s8e1ca49acsa',
          fecha_lim_emision: '15-06-2023'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dosificacion_Facturas', null, {})
  }
}
