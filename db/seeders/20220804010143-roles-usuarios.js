'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles_Usuarios',
      [
        {
          id_rol_usuario: '8ec7c85e-5029-4c53-9986-74ad4fb40923',
          id_usuario: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          id_rol: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
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
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles_Usuarios', null, {})
  }
}
