'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'DetalleVentas',
      [
        {
          id: '48548eb8-d94d-495c-bf4c-f95ce97354e2',
          id_venta: '54a4b3f3-da45-4645-8ad7-1a3d37b64272',
          id_prod: 'fa4eebc4-b6fc-4028-a027-0e7a5477372e',
          cantidad: 1,
          precio_uni: 92.8
        },
        {
          id: '5d4ade1f-8d28-4399-b24e-a65045b8aa82',
          id_venta: 'cf70c572-31c8-447b-92fa-6a975ade0ecf',
          id_prod: 'e171fddb-a962-4c50-addb-6d742a3a4bbb',
          cantidad: 1,
          precio_uni: 136.8
        },
        {
          id: '9129fe62-55d7-4db8-9a97-1f539fe3b046',
          id_venta: '1a7d1c89-fd7e-4386-a8ad-357daecb7d80',
          id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df',
          cantidad: 1,
          precio_uni: 48
        },
        {
          id: 'aefabfcf-76c0-4107-b450-40eb8af21870',
          id_venta: '5335ddb1-7065-4645-8df2-a4cd95c2c3d3',
          id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df',
          cantidad: 1,
          precio_uni: 48
        },
        {
          id: 'beb2da8d-6341-46b6-9ecd-276205a430b9',
          id_venta: '1a7d1c89-fd7e-4386-a8ad-357daecb7d80',
          id_prod: 'fa4eebc4-b6fc-4028-a027-0e7a5477372e',
          cantidad: 1,
          precio_uni: 92.8
        },
        {
          id: 'cec3ffbf-f428-498a-8d63-dfd1440c53de',
          id_venta: 'cf70c572-31c8-447b-92fa-6a975ade0ecf',
          id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df',
          cantidad: 1,
          precio_uni: 48
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DetalleVentas', null, {})
  }
}
