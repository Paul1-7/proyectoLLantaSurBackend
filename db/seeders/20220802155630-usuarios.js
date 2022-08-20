module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Usuarios',
      [
        {
          id_usuario: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
          ci_nit: '5423452334',
          password: 'Mateo12.s',
          email: 'juans@gmail.com',
          celular: 71832648,
          usuario: 'juans'
        },
        {
          id_usuario: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          ci_nit: '7432334',
          password: 'Maria12.s',
          email: 'maria@gmail.com',
          celular: 65832648,
          usuario: 'maria'
        },
        {
          id_usuario: 'd71ac730-e43b-4c9c-a480-164f9c630e07',
          ci_nit: '73455334',
          password: 'Ricardo12.s',
          email: 'ricardo@gmail.com',
          celular: 64846131,
          usuario: 'ricardo'
        },
        {
          id_usuario: 'eb31ccf2-68f2-4f42-97ec-ebd8133f98c2',
          ci_nit: '71684934',
          password: 'Melissa12.s',
          email: 'melissa@gmail.com',
          celular: 718684834,
          usuario: 'melissa'
        },
        {
          id_usuario: 'bfd25eb9-badb-4cdc-bc6d-2bc472312427',
          ci_nit: '7992134',
          password: 'Maria122.s',
          email: 'mariaJose@gmail.com',
          celular: 73794681,
          usuario: 'mariaJose'
        },
        {
          id_usuario: '0bcea5bb-33f0-4a3d-b1df-0f63145ea252',
          ci_nit: 44860363,
          password: 'Admin.123',
          email: 'Laura75@gmail.com',
          celular: 78118428,
          usuario: 'Jordi'
        },
        {
          id_usuario: '8a84d79b-49d5-4c6a-8f9d-391c12aed841',
          ci_nit: 23832214,
          password: 'Admin.123',
          email: 'Anni40@yahoo.com',
          celular: 71249237,
          usuario: 'Anni'
        },
        {
          id_usuario: '567c0552-c250-4d69-bc54-482296a95e4b',
          ci_nit: 84981323,
          password: 'Admin.123',
          email: 'Daniel89@hotmail.com',
          celular: 66280245,
          usuario: 'Carles'
        },
        {
          id_usuario: 'e57e500b-5162-4159-bba7-732228c10ed8',
          ci_nit: 71555625,
          password: 'Admin.123',
          email: 'Jorge43@hotmail.com',
          celular: 72613222,
          usuario: 'Andrea'
        },
        {
          id_usuario: '741c6697-22d7-4f87-a4f2-7c835b21176d',
          ci_nit: 80988745,
          password: 'Admin.123',
          email: 'Matilde_Koelpin65@hotmail.com',
          celular: 72356691,
          usuario: 'Marta'
        },
        {
          id_usuario: '292b847e-1ac1-41f9-9b59-a6debc862502',
          ci_nit: 65841734,
          password: 'Admin.123',
          email: 'RosDDer99@hotmail.com',
          celular: 73016001,
          usuario: 'Jordi14'
        },
        //
        {
          id_usuario: 'd2b5da00-fea5-44fd-ba59-fb3aff74f7ef',
          ci_nit: 62458123,
          password: 'Admin.123',
          email: 'Anni400@yahoo.com',
          celular: 72849237,
          usuario: 'Annicol'
        },
        {
          id_usuario: 'ace0fc3f-b172-4905-b2db-2865cf98678b',
          ci_nit: 79101234,
          password: 'Admin.123',
          email: 'Daniel890@hotmail.com',
          celular: 67812340,
          usuario: 'CarlessA'
        },
        {
          id_usuario: 'd9a4f84b-e659-44b5-b6ce-16eae57e31f3',
          ci_nit: 61891234,
          password: 'Admin.123',
          email: 'Jorge430@hotmail.com',
          celular: 65712483,
          usuario: 'Andreas'
        },
        {
          id_usuario: '324c2f1d-3aa8-4bdb-b646-1f9f6847f3b0',
          ci_nit: 89143647,
          password: 'Admin.123',
          email: 'Matilde_Koelpin650@hotmail.com',
          celular: 71346474,
          usuario: 'Marta12'
        },
        {
          id_usuario: 'b60047b1-a9f2-4309-9fcd-1868785dfb5a',
          ci_nit: 65943154,
          password: 'Admin.123',
          email: 'RoserB99@hotmail.com',
          celular: 71738531,
          usuario: 'Jordi14m'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {})
  }
}
