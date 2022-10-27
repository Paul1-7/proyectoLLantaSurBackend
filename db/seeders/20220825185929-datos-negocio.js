'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Datos_Negocio',
      [
        {
          id: '7bb98029-8c22-450d-ba9d-06a264a220d9',
          num_doc: '1020269020',
          nombre: 'Llantas sur',
          actividad_eco:
            'Venta de partes, piezas y accesorios de vehículos automotores',
          leyenda:
            'Esta factura contribuye al desarrollo del país, el uso ilicito será sancionado penalmente de acuerdo a ley',
          cant_min_prod: 5,
          email: 'llantas-sur@gmail.com'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Datos_Negocio', null, {})
  }
}
