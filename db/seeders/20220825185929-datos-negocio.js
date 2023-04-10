'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'DatosNegocio',
      [
        {
          id: '7bb98029-8c22-450d-ba9d-06a264a220d9',
          num_doc: '1020269020',
          cuf: 'CODIGOUNICO',
          nombre: 'Llantas sur',
          actividad_eco:
            'Venta de partes, piezas y accesorios de vehículos automotores',
          leyenda:
            '"Esta factura contribuye al desarrollo del país, el uso ilicito será sancionado penalmente de acuerdo a ley"',
          email: 'llantas-sur@gmail.com',
          tel: '6789191',
          direccion: 'Barrio Senac calle Alejandro N°214',
          ciudad: 'Tarija'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DatosNegocio', null, {})
  }
}
