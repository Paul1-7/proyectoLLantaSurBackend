'use strict'
const { CLIENTE } = require('../../config/roles')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'RolesUsuarios',
      [
        {
          id_rol_usuario: '8ec7c85e-5029-4c53-9986-74ad4fb40923',
          id_usuario: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_rol: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        },
        {
          id_rol_usuario: '1bffa19e-f5ef-4b11-8638-ab090c9637d2',
          id_usuario: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_rol: CLIENTE.id
        },
        {
          id_rol_usuario: 'c6b608e2-d6b0-4c9d-9fd7-2df1aace1cfd',
          id_usuario: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          id_rol: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_rol_usuario: '1c64cc89-9c5b-4672-a738-2f99696ba0e3',
          id_usuario: 'd71ac730-e43b-4c9c-a480-164f9c630e07',
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b'
        },
        {
          id_rol_usuario: '17cfefd2-59cd-4e48-b66c-144305c2569d',
          id_usuario: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_rol: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_rol_usuario: '6bdd7bc3-5f88-45e8-ab8a-972a4c548500',
          id_usuario: 'eb31ccf2-68f2-4f42-97ec-ebd8133f98c2',
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b'
        },
        {
          id_rol_usuario: '853eb0ec-7643-4873-b564-863e2ffc2a73',
          id_usuario: 'bfd25eb9-badb-4cdc-bc6d-2bc472312427',
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b'
        },
        {
          id_rol_usuario: '6064d5bb-b736-4411-9fa2-af3cc5e7c790',
          id_usuario: '0bcea5bb-33f0-4a3d-b1df-0f63145ea252',
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b'
        },
        {
          id_rol_usuario: '53c10dac-e4a4-467e-9543-ae49745f5a0d',
          id_usuario: '8a84d79b-49d5-4c6a-8f9d-391c12aed841',
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b'
        },
        {
          id_rol_usuario: '749d4583-98ae-4552-9d2b-634d9aedc189',
          id_usuario: '567c0552-c250-4d69-bc54-482296a95e4b',
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b'
        },
        {
          id_rol_usuario: '14e4531d-adec-4c1e-b6b9-363113b8450e',
          id_usuario: 'e57e500b-5162-4159-bba7-732228c10ed8',
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b'
        },
        {
          id_rol_usuario: 'f0722535-2e4d-4a36-bea5-5c00f5aa7e9a',
          id_usuario: '741c6697-22d7-4f87-a4f2-7c835b21176d',
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b'
        },
        {
          id_rol_usuario: 'db3e09fd-86c1-4689-bdad-3ea856f7207e',
          id_usuario: '292b847e-1ac1-41f9-9b59-a6debc862502',
          id_rol: '95acac1e-28be-4ef4-9978-3979277d511b'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RolesUsuarios', null, {})
  }
}
