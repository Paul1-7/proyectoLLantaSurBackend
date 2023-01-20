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
        },
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
        },
        //
        {
          id: 'dc2d631e-3ce1-4733-bc55-590a3b1c975c',
          stock: 16,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: '9cc62120-7ba0-4ee4-9185-9faefb0f3733'
        },
        {
          id: '7e71f114-3150-47f8-a7ec-57cd9d9719fa',
          stock: 26,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: '9cc62120-7ba0-4ee4-9185-9faefb0f3733'
        },
        {
          id: 'd5cb6bbb-a07e-4b6e-ae8a-61f5b1728e6d',
          stock: 4,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: 'bd029433-2a9e-4e14-991a-96e031344c42'
        },
        {
          id: '30f4f7f0-6f3d-4697-8216-6170718f230b',
          stock: 36,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: 'bd029433-2a9e-4e14-991a-96e031344c42'
        },
        {
          id: '13090192-1c9f-46db-8403-84ed897a7577',
          stock: 13,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: 'e171fddb-a962-4c50-addb-6d742a3a4bbb'
        },
        {
          id: '038bda2d-8d2d-4f77-8769-57866e3d7a80',
          stock: 20,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: 'e171fddb-a962-4c50-addb-6d742a3a4bbb'
        },
        {
          id: '29f70283-91e1-4d9b-b5a9-847fcdc761fb',
          stock: 20,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: 'e66b9e94-8cd2-42e6-9627-29d452302769'
        },
        {
          id: '0440759a-5efc-43bf-bccd-cb25fd94e527',
          stock: 20,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: 'e66b9e94-8cd2-42e6-9627-29d452302769'
        },
        {
          id: 'c99827dd-b13a-47ef-8c37-e8ffbf0b0384',
          stock: 26,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df'
        },
        {
          id: '67b65a7c-bc71-47c2-a35d-65bd4c1505ca',
          stock: 16,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df'
        },
        {
          id: '7859717e-a343-40c6-8301-aede4cf2748a',
          stock: 26,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: 'ea6f9e29-3715-434a-93bd-76d9e578c156'
        },
        {
          id: '8f4ee978-8139-46cf-89c2-625c073ecbaf',
          stock: 16,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: 'ea6f9e29-3715-434a-93bd-76d9e578c156'
        },
        {
          id: '98eaedf0-a246-487d-b02d-7345707284f1',
          stock: 14,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: 'edd06561-c2c1-4a7f-a0ac-8ae2668f9e3b'
        },
        {
          id: 'e4004b00-e2b6-4171-a92d-2fca136462e9',
          stock: 12,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: 'edd06561-c2c1-4a7f-a0ac-8ae2668f9e3b'
        },
        {
          id: 'acf67796-d2d2-4beb-8a0e-cd837045aecd',
          stock: 15,
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
          id_prod: 'fa4eebc4-b6fc-4028-a027-0e7a5477372e'
        },
        {
          id: '23f330d7-7ec7-4316-a000-31132d08973a',
          stock: 6,
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
          id_prod: 'fa4eebc4-b6fc-4028-a027-0e7a5477372e'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sucursales_Productos', null, {})
  }
}
