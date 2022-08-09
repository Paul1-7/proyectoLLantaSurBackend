'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categorias',
      [
        {
          nombre_cat: 'Iluminación',
          desc_cat: 'Todo tipo de luces',
          estado_cat: 1
        },
        {
          nombre_cat: 'Embragues',
          desc_cat: 'Todo tipo de embragues',
          estado_cat: 1
        },
        {
          nombre_cat: 'Motores',
          desc_cat: 'partes de todo tipo de motores',
          estado_cat: 1
        },
        {
          nombre_cat: 'Espejos',
          desc_cat: 'Todo tipo de espejos',
          estado_cat: 1
        },
        {
          nombre_cat: 'Llantas',
          desc_cat: 'Todo tipo de llantas',
          estado_cat: 1
        },
        {
          nombre_cat: 'Amortiguadores',
          desc_cat: 'Todo tipo de amortiguadores',
          estado_cat: 1
        },
        {
          nombre_cat: 'Aros',
          desc_cat: 'Todo tipo de aros para llantas',
          estado_cat: 1
        },
        {
          nombre_cat: 'Frenos',
          desc_cat: 'Todo tipo de frenos',
          estado_cat: 1
        },
        {
          nombre_cat: 'Aceites',
          desc_cat: 'Todo tipo de aceites para motor',
          estado_cat: 1
        },
        {
          nombre_cat: 'Accesorios',
          desc_cat: 'Todo tipo de accesorios para vehículos',
          estado_cat: 1
        },
        {
          nombre_cat: 'Filtros',
          desc_cat: 'Todo tipo de filtros para motor',
          estado_cat: 1
        },
        {
          nombre_cat: 'Herramientas',
          desc_cat: 'Todo tipo de herramientas',
          estado_cat: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias', null, {})
  }
}
