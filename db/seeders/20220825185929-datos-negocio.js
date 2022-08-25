'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Datos_Negocio',
      [
        {
          id_neg: '7bb98029-8c22-450d-ba9d-06a264a220d9',
          num_doc_neg: '1020269020',
          nombre_neg: 'Llantas sur',
          actividad_eco_neg:
            'Venta de partes, piezas y accesorios de vehículos automotores',
          leyenda_neg:
            'Esta factura contribuye al desarrollo del país, el uso ilicito será sancionado penalmente de acuerdo a ley',
          cant_min_prod: 5,
          logotipo_neg: 'logo.jpg',
          id_logo_neg: 'idlogo',
          email_neg: 'llantas-sur@gmail.com'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Datos_Negocio', null, {})
  }
}
