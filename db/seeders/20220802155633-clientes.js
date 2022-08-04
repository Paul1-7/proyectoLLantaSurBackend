'use strict'

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
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clientes', null, {})
  }
}
