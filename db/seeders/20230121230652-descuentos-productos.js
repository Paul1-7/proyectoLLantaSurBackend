'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'DescuentosProductos',
      [
        {
          id: '524abe50-f7f8-4aab-91fe-c85c0e4a76cc',
          id_desc: '0a1d54e3-1db2-4c76-8bb0-3029d183aece',
          id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df',
          cant_max: 4,
          precio: 79
        },
        {
          id: '65b94c82-aa3c-4324-9406-9dfc4dd8486c',
          id_desc: '0a1d54e3-1db2-4c76-8bb0-3029d183aece',
          id_prod: 'fa4eebc4-b6fc-4028-a027-0e7a5477372e',
          cant_max: 4,
          precio: 13
        },
        {
          id: 'cd87997b-6751-47ef-be86-f10a60e617f6',
          id_desc: '0a1d54e3-1db2-4c76-8bb0-3029d183aece',
          id_prod: 'bd029433-2a9e-4e14-991a-96e031344c42',
          cant_max: 2,
          precio: 49
        },
        {
          id: '54e11db2-2585-44b0-b7bf-edf07dd3a775',
          id_desc: 'de1a9b89-3d81-423c-892e-e9ce61b27ebc',
          id_prod: '86920832-a3b8-4bc7-a954-e3dc2039f764',
          cant_max: 6,
          precio: 56
        },
        {
          id: 'c500ec3c-0b0b-4dd5-bdd9-4e20243fe438',
          id_desc: 'de1a9b89-3d81-423c-892e-e9ce61b27ebc',
          id_prod: 'e171fddb-a962-4c50-addb-6d742a3a4bbb',
          cant_max: 8,
          precio: 190
        },
        {
          id: '5375180c-2b03-4242-b9d7-43eb0e5a65b3',
          id_desc: 'de1a9b89-3d81-423c-892e-e9ce61b27ebc',
          id_prod: '24701192-50b2-4ee3-bda1-a305cceb98b1',
          cant_max: 14,
          precio: 180.1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DescuentosProductos', null, {})
  }
}
