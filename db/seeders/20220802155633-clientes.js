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
          ci: '5423452334',
          password: 'Mateo12.s',
          email: 'juans@gmail.com',
          celular: 71832648
        },
        {
          nombre: 'Maria Tamara',
          foto: '',
          apellido: 'Gonzales Escobar',
          ci: '743452334',
          password: 'Maria12.s',
          email: 'maria@gmail.com',
          celular: 65832648
        },
        {
          nombre: 'Ricardo Ponce',
          foto: '',
          apellido: 'Nuñez Sanchez',
          ci: '73455334',
          password: 'Ricardo12.s',
          estado: '0',
          email: 'ricardo@gmail.com',
          celular: 65436648
        },
        {
          nombre: 'Melissa Paola',
          foto: '',
          apellido: 'Valdez Rodriguez',
          ci: '71684934',
          password: 'Melissa12.s',
          email: 'melissa@gmail.com'
        },
        {
          nombre: 'Maria Jose',
          foto: '',
          apellido: 'Rivas Rodriguez',
          ci: '7992134',
          password: 'Maria122.s',
          estado: '0',
          email: 'mariaJose@gmail.com'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clientes', null, {})
  }
}
