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
          usuario: 'juans',
          nombre: 'Mateo Juans',
          apellido: 'Martinez Gonzales',
          estado: 0,
          direccion: 'Calle falsa 123',
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        },
        {
          id_usuario: '08f07e13-d12e-45e7-86ca-9b17e3158aad',
          ci_nit: '7432334',
          password: 'Maria12.s',
          email: 'maria@gmail.com',
          celular: 65832648,
          usuario: 'maria',
          nombre: 'Maria Tamara',
          apellido: 'Gonzales Escobar',
          estado: 1,
          direccion: 'Calle falsa 1235',
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        },
        {
          id_usuario: 'd71ac730-e43b-4c9c-a480-164f9c630e07',
          ci_nit: '73455334',
          password: 'Ricardo12.s',
          email: 'ricardo@gmail.com',
          celular: 64846131,
          usuario: 'ricardo',
          nombre: 'Ricardo Ponce',
          apellido: 'Nuñez Sanchez',
          estado: 0,
          direccion: 'B. La Loma Calle falsa 123',
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        },
        {
          id_usuario: 'eb31ccf2-68f2-4f42-97ec-ebd8133f98c2',
          ci_nit: '71684934',
          password: 'Melissa12.s',
          email: 'melissa@gmail.com',
          celular: 718684834,
          usuario: 'melissa',
          nombre: 'Melissa Paola',
          apellido: 'Valdez Rodriguez',
          estado: 1,
          direccion: '9260 Kaden Lakes',
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        },
        {
          id_usuario: 'bfd25eb9-badb-4cdc-bc6d-2bc472312427',
          ci_nit: '7992134',
          password: 'Maria122.s',
          email: 'mariaJose@gmail.com',
          celular: 73794681,
          usuario: 'mariaJose',
          nombre: 'Maria Jose',
          apellido: 'Rivas Rodriguez',
          estado: 0,
          direccion: 'Calle 624 Deion Throughway',
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        },
        {
          id_usuario: '0bcea5bb-33f0-4a3d-b1df-0f63145ea252',
          ci_nit: 44860363,
          password: 'Admin.123',
          email: 'Laura75@gmail.com',
          celular: 78118428,
          usuario: 'Jordi',
          nombre: 'Laura',
          apellido: 'Gálvez',
          estado: '1',
          direccion: '47010 Haag Street',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_usuario: '8a84d79b-49d5-4c6a-8f9d-391c12aed841',
          ci_nit: 23832214,
          password: 'Admin.123',
          email: 'Anni40@yahoo.com',
          celular: 71249237,
          usuario: 'Anni',
          nombre: 'Anni',
          apellido: 'Montañez',
          estado: '1',
          direccion: '08401 Weber Motorway',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_usuario: '567c0552-c250-4d69-bc54-482296a95e4b',
          ci_nit: 84981323,
          password: 'Admin.123',
          email: 'Daniel89@hotmail.com',
          celular: 66280245,
          usuario: 'Carles',
          nombre: 'Daniel',
          apellido: 'Zepeda',
          estado: '1',
          direccion: '51509 Klein Springs',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_usuario: 'e57e500b-5162-4159-bba7-732228c10ed8',
          ci_nit: 71555625,
          password: 'Admin.123',
          email: 'Jorge43@hotmail.com',
          celular: 72613222,
          usuario: 'Andrea',
          nombre: 'Jorge',
          apellido: 'Cardona',
          estado: '1',
          direccion: '802 Denis Trafficway',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_usuario: '741c6697-22d7-4f87-a4f2-7c835b21176d',
          ci_nit: 80988745,
          password: 'Admin.123',
          email: 'Matilde_Koelpin65@hotmail.com',
          celular: 72356691,
          usuario: 'Marta',
          nombre: 'Matilde',
          apellido: 'Munguía',
          estado: '1',
          direccion: '5773 Ole Parkways',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_usuario: '292b847e-1ac1-41f9-9b59-a6debc862502',
          ci_nit: 65841734,
          password: 'Admin.123',
          email: 'RosDDer99@hotmail.com',
          celular: 73016001,
          usuario: 'Jordi14',
          nombre: 'Roser',
          apellido: 'Rivera',
          estado: '1',
          direccion: '7945 Ruecker Fords',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        //
        {
          id_usuario: 'd2b5da00-fea5-44fd-ba59-fb3aff74f7ef',
          ci_nit: 62458123,
          password: 'Admin.123',
          email: 'Anni400@yahoo.com',
          celular: 72849237,
          usuario: 'Annicol',
          nombre: 'Josep',
          apellido: 'Guillén',
          estado: '1',
          direccion: 'Calle 624 Deion Throughway',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_usuario: 'ace0fc3f-b172-4905-b2db-2865cf98678b',
          ci_nit: 79101234,
          password: 'Admin.123',
          email: 'Daniel890@hotmail.com',
          celular: 67812340,
          usuario: 'CarlessA',
          nombre: 'Josep',
          apellido: 'Pichardo',
          direccion: 'Calle 624 Deion Throughway',
          estado: '1',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_usuario: 'd9a4f84b-e659-44b5-b6ce-16eae57e31f3',
          ci_nit: 61891234,
          password: 'Admin.123',
          email: 'Jorge430@hotmail.com',
          celular: 65712483,
          usuario: 'Andreas',
          nombre: 'Maica',
          apellido: 'Cepeda',
          estado: '1',
          direccion: 'Calle 624 Deion Throughway',
          id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
        },
        {
          id_usuario: '324c2f1d-3aa8-4bdb-b646-1f9f6847f3b0',
          ci_nit: 89143647,
          password: 'Admin.123',
          email: 'Matilde_Koelpin650@hotmail.com',
          celular: 71346474,
          usuario: 'Marta12',
          nombre: 'Anni',
          direccion: 'Calle 624 Deion Throughway',
          apellido: 'Reynoso',
          estado: '1',
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        },
        {
          id_usuario: 'b60047b1-a9f2-4309-9fcd-1868785dfb5a',
          ci_nit: 65943154,
          password: 'Admin.123',
          email: 'RoserB99@hotmail.com',
          celular: 71738531,
          usuario: 'Jordi14m',
          nombre: 'Manuel',
          direccion: 'Calle 624 Deion Throughway',
          apellido: 'de Jesús',
          estado: '1',
          id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {})
  }
}
