'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Sucursales_Productos',
      [
        {
          id: '99a1fd10-97ba-4145-86f8-b723b2fc2d45',
          stock: 4,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: '03a213b5-eb6b-4baf-90f0-25497102c960'
        },
        {
          id: '0492ac03-bf93-45a0-881d-4a7b6efb7232',
          stock: 53,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: '14f23bde-837c-4f51-bb6a-2ddce96f4728'
        },
        {
          id: '48eaa9b6-d873-47a9-9404-ef6036d4f95a',
          stock: 68,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: '24701192-50b2-4ee3-bda1-a305cceb98b1'
        },
        {
          id: 'dd2f4ffc-4cde-4b7f-a573-b94c1b9c5c18',
          stock: 56,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: '2d9313a1-e110-4289-82f1-55cef50275bb'
        },
        {
          id: '72679667-fc70-4747-8ddd-f40c8a3c49eb',
          stock: 11,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: '4bdee13f-dac4-4c9d-a6c1-4dfb59ba9732'
        },
        {
          id: '766f51d3-eba6-47fa-80e6-e16ac39ba808',
          stock: 14,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: '55f74d7b-6cbe-4c2f-82a7-e59d80ce9606'
        },
        {
          id: '3faf37a0-98ad-44e3-9031-a37ed79e44e9',
          stock: 16,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: '86920832-a3b8-4bc7-a954-e3dc2039f764'
        }, //
        {
          id: 'becb06c7-5e6b-4629-92de-54357f40c242',
          stock: 88,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: '03a213b5-eb6b-4baf-90f0-25497102c960'
        },
        {
          id: '041d30d8-3915-4a81-a770-50e78017d4e3',
          stock: 76,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: '14f23bde-837c-4f51-bb6a-2ddce96f4728'
        },
        {
          id: '64adf1ef-2581-43f5-a821-8b924bccd86a',
          stock: 60,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: '24701192-50b2-4ee3-bda1-a305cceb98b1'
        },
        {
          id: '83467d7d-4553-482c-88d8-61c1702354a7',
          stock: 42,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: '2d9313a1-e110-4289-82f1-55cef50275bb'
        },
        {
          id: '5e252b33-5153-4fab-a421-77a2e04b2525',
          stock: 85,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: '4bdee13f-dac4-4c9d-a6c1-4dfb59ba9732'
        },
        {
          id: '67d57e5e-f342-494c-8190-4151a481b5ea',
          stock: 39,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: '55f74d7b-6cbe-4c2f-82a7-e59d80ce9606'
        },
        {
          id: '97d8be9f-8808-4aca-8622-c50314e472a6',
          stock: 41,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: '86920832-a3b8-4bc7-a954-e3dc2039f764'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sucursales_Productos', null, {})
  }
}
