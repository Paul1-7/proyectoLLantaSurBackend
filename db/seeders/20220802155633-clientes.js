module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Clientes',
      [
        {
          nombre: 'Mateo Juans',
          foto: '',
          apellido: 'Martinez Gonzales',
          ci_nit: '5423452334',
          password: 'Mateo12.s',
          email: 'juans@gmail.com',
          celular: 71832648,
          estado: 0,
          direccion: 'Calle falsa 123',
          usuario: 'juans'
        },
        {
          nombre: 'Maria Tamara',
          foto: '',
          apellido: 'Gonzales Escobar',
          ci_nit: '7432334',
          password: 'Maria12.s',
          email: 'maria@gmail.com',
          estado: 1,
          celular: 65832648,
          direccion: 'Calle falsa 1235',
          usuario: 'maria'
        },
        {
          nombre: 'Ricardo Ponce',
          foto: '',
          apellido: 'Nuñez Sanchez',
          ci_nit: '73455334',
          password: 'Ricardo12.s',
          estado: 0,
          email: 'ricardo@gmail.com',
          celular: 64846131,
          direccion: 'B. La Loma Calle falsa 123',
          usuario: 'ricardo'
        },
        {
          nombre: 'Melissa Paola',
          foto: '',
          apellido: 'Valdez Rodriguez',
          ci_nit: '71684934',
          password: 'Melissa12.s',
          estado: 1,
          email: 'melissa@gmail.com',
          celular: 718684834,
          direccion: '9260 Kaden Lakes',
          usuario: 'melissa'
        },
        {
          nombre: 'Maria Jose',
          foto: '',
          apellido: 'Rivas Rodriguez',
          ci_nit: '7992134',
          password: 'Maria122.s',
          estado: 0,
          email: 'mariaJose@gmail.com',
          celular: 73794681,
          direccion: 'Calle 624 Deion Throughway',
          usuario: 'mariaJose'
        },
        {
          nombre: 'Laura',
          foto: '',
          apellido: 'Gálvez',
          ci_nit: 44860363,
          password: 'Admin.123',
          estado: '1',
          email: 'Laura75@gmail.com',
          celular: 78118428,
          direccion: '47010 Haag Street',
          usuario: 'Jordi'
        },
        {
          nombre: 'Anni',
          foto: '',
          apellido: 'Montañez',
          ci_nit: 23832214,
          password: 'Admin.123',
          estado: '1',
          email: 'Anni40@yahoo.com',
          celular: 71249237,
          direccion: '08401 Weber Motorway',
          usuario: 'Anni'
        },
        {
          nombre: 'Daniel',
          foto: '',
          apellido: 'Zepeda',
          ci_nit: 84981323,
          password: 'Admin.123',
          estado: '1',
          email: 'Daniel89@hotmail.com',
          celular: 66280245,
          direccion: '51509 Klein Springs',
          usuario: 'Carles'
        },
        {
          nombre: 'Jorge',
          foto: '',
          apellido: 'Cardona',
          ci_nit: 71555625,
          password: 'Admin.123',
          estado: '1',
          email: 'Jorge43@hotmail.com',
          celular: 72613222,
          direccion: '802 Denis Trafficway',
          usuario: 'Andrea'
        },
        {
          nombre: 'Matilde',
          foto: '',
          apellido: 'Munguía',
          ci_nit: 80988745,
          password: 'Admin.123',
          estado: '1',
          email: 'Matilde_Koelpin65@hotmail.com',
          celular: 72356691,
          direccion: '5773 Ole Parkways',
          usuario: 'Marta'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clientes', null, {})
  }
}
