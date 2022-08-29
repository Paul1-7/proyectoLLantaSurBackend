module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Ventas',
      [
        {
          id_venta: '54a4b3f3-da45-4645-8ad7-1a3d37b64272',
          cod_venta: 6800,
          tipo_venta: 0,
          metodo_pago: 1,
          total_venta: 265.2,
          fecha_venta: '2022-05-27',
          id_vendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_cliente: 'd71ac730-e43b-4c9c-a480-164f9c630e07'
        },
        {
          id_venta: '721e8d0e-3a0d-4d62-ae8a-e2df0054e1e7',
          cod_venta: 6801,
          tipo_venta: 1,
          metodo_pago: 0,
          total_venta: 168.2,
          fecha_venta: '2022-06-02',
          id_vendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_cliente: 'd71ac730-e43b-4c9c-a480-164f9c630e07'
        },
        {
          id_venta: 'ea49ee5b-90c3-456a-88a1-8a97a349d046',
          cod_venta: 6802,
          tipo_venta: 0,
          metodo_pago: 1,
          total_venta: 294,
          fecha_venta: '2022-06-15',
          id_vendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_cliente: 'eb31ccf2-68f2-4f42-97ec-ebd8133f98c2'
        },
        {
          id_venta: '20ec796d-044c-4871-8494-df736c07c062',
          cod_venta: 6803,
          tipo_venta: 0,
          metodo_pago: 0,
          total_venta: 394,
          fecha_venta: '2022-03-18',
          id_vendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_cliente: 'bfd25eb9-badb-4cdc-bc6d-2bc472312427'
        },
        {
          id_venta: '3e0a090a-4441-4c4a-b458-57c162fe6d47',
          cod_venta: 6804,
          tipo_venta: 1,
          metodo_pago: 1,
          total_venta: 194.9,
          fecha_venta: '2021-11-09',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: 'bfd25eb9-badb-4cdc-bc6d-2bc472312427'
        },
        {
          id_venta: '0ca5a61d-ab58-4cb5-84a0-0960aafaed08',
          cod_venta: 6800,
          tipo_venta: 1,
          metodo_pago: 1,
          total_venta: 1684.6,
          fecha_venta: '2022-02-27',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: '8a84d79b-49d5-4c6a-8f9d-391c12aed841'
        },
        {
          id_venta: '13d7c78c-0b92-4863-9747-06f283d8f078',
          cod_venta: 6801,
          tipo_venta: 0,
          metodo_pago: 1,
          total_venta: 1984.4,
          fecha_venta: '2022-01-04',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: '8a84d79b-49d5-4c6a-8f9d-391c12aed841'
        },
        {
          id_venta: '9f5d43c1-ef74-4b97-8fdc-6afc2f63a7b9',
          cod_venta: 6802,
          tipo_venta: 1,
          metodo_pago: 0,
          total_venta: 85,
          fecha_venta: '2022-08-05',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: '8a84d79b-49d5-4c6a-8f9d-391c12aed841'
        }, //
        {
          id_venta: '6bbc40fe-6be0-438c-b745-63ca4567ca6e',
          cod_venta: 6803,
          tipo_venta: 1,
          metodo_pago: 1,
          total_venta: 16,
          fecha_venta: '2021-11-01',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: '567c0552-c250-4d69-bc54-482296a95e4b'
        },
        {
          id_venta: '774ecd9b-2106-425b-9f68-ef13de57ef2f',
          cod_venta: 6804,
          tipo_venta: 1,
          metodo_pago: 1,
          total_venta: 189,
          fecha_venta: '2022-07-20',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: '567c0552-c250-4d69-bc54-482296a95e4b'
        },
        {
          id_venta: 'b532ae83-dc85-4fcb-ae0a-43a6aef4a5d6',
          cod_venta: 6800,
          tipo_venta: 0,
          metodo_pago: 1,
          total_venta: 849,
          fecha_venta: '2021-12-09',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: '567c0552-c250-4d69-bc54-482296a95e4b'
        },
        {
          id_venta: '6198a0e3-2b41-480c-b759-e3ca7038ec75',
          cod_venta: 6801,
          tipo_venta: 1,
          metodo_pago: 0,
          total_venta: 49,
          fecha_venta: '2022-07-02',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: 'e57e500b-5162-4159-bba7-732228c10ed8'
        },
        {
          id_venta: '981d8304-5b3a-4ef5-a00f-3d3537ff94f1',
          cod_venta: 6802,
          tipo_venta: 0,
          metodo_pago: 1,
          total_venta: 98.6,
          fecha_venta: '2022-01-15',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: 'e57e500b-5162-4159-bba7-732228c10ed8'
        },
        {
          id_venta: 'a2500625-0f83-4d61-ad20-9b80c87e5736',
          cod_venta: 6803,
          tipo_venta: 1,
          metodo_pago: 0,
          total_venta: 89.4,
          fecha_venta: '2022-07-05',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: '741c6697-22d7-4f87-a4f2-7c835b21176d'
        },
        {
          id_venta: 'aa5ce698-6929-4470-b6e2-4b4c2518d273',
          cod_venta: 6804,
          tipo_venta: 1,
          metodo_pago: 1,
          total_venta: 89.6,
          fecha_venta: '2021-09-14',
          id_vendedor: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_cliente: '741c6697-22d7-4f87-a4f2-7c835b21176d'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ventas', null, {})
  }
}
