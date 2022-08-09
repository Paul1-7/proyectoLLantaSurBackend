'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Marcas',
      [
        {
          nombre_marca: 'Dunlop',
          estado_marca: 1
        },
        {
          nombre_marca: 'Honda',
          estado_marca: 1
        },
        {
          nombre_marca: 'Hyundai',
          estado_marca: 1
        },
        {
          nombre_marca: 'Jeep',
          estado_marca: 1
        },
        {
          nombre_marca: 'Mitsubishi',
          estado_marca: 1
        },
        {
          nombre_marca: 'Nissan',
          estado_marca: 1
        },
        {
          nombre_marca: 'Toyota',
          estado_marca: 1
        },
        {
          nombre_marca: 'Volvo',
          estado_marca: 1
        },
        {
          nombre_marca: 'Yamaha',
          estado_marca: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Marcas', null, {})
  }
}
