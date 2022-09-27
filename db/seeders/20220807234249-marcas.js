'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Marcas',
      [
        {
          id: '263c2e2a-b62d-4db9-8480-a75791d35afe',
          nombre: 'Dunlop',
          estado: 1
        },
        {
          id: '806abbce-f4f7-4bff-9900-7a5c2e543841',
          nombre: 'Honda',
          estado: 1
        },
        {
          id: '575fc407-96ba-4a8c-a862-3ecd1a074e43',
          nombre: 'Hyundai',
          estado: 1
        },
        {
          id: '5e62bb40-c8d1-4310-88e6-cc51bd209e44',
          nombre: 'Jeep',
          estado: 1
        },
        {
          id: '26382ae8-1ded-4fa6-b227-a05a6b5fbd9b',
          nombre: 'Mitsubishi',
          estado: 1
        },
        {
          id: 'a5d851e9-0bb9-4053-9bac-529cb2571902',
          nombre: 'Nissan',
          estado: 1
        },
        {
          id: 'e63fdfb4-eb38-4c38-91c2-704a92158759',
          nombre: 'Toyota',
          estado: 1
        },
        {
          id: '6b66fd90-c3e6-4bd3-95ee-ded928598a87',
          nombre: 'Volvo',
          estado: 1
        },
        {
          id: '72135c74-af0e-4fda-822e-d1e85b5308f1',
          nombre: 'Yamaha',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Marcas', null, {})
  }
}
