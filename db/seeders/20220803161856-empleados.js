'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Empleados',
      [
        {
          nombre_emp: 'Josep',
          apellido_emp: 'Guillén',
          foto_emp: '',
          ci_emp: 72952955,
          password_emp: 'Admin.123',
          estado_emp: '1',
          celular_emp: 68643570,
          usuario_emp: 'Carles',
          email_emp: 'Josep_Gottlieb@gmail.com'
        },
        {
          nombre_emp: 'Josep',
          apellido_emp: 'Pichardo',
          foto_emp: '',
          ci_emp: 82384653,
          password_emp: 'Admin.123',
          estado_emp: '1',
          celular_emp: 74850522,
          usuario_emp: 'Lorena',
          email_emp: 'Josep.Pichardo@yahoo.com'
        },
        {
          nombre_emp: 'Maica',
          apellido_emp: 'Cepeda',
          foto_emp: '',
          ci_emp: 46502789,
          password_emp: 'Admin.123',
          estado_emp: '1',
          celular_emp: 71709936,
          usuario_emp: 'Ricardo',
          email_emp: 'Maica_Cepeda36@gmail.com'
        },
        {
          nombre_emp: 'Anni',
          apellido_emp: 'Reynoso',
          foto_emp: '',
          ci_emp: 16451788,
          password_emp: 'Admin.123',
          estado_emp: '1',
          celular_emp: 78605041,
          usuario_emp: 'Maica',
          email_emp: 'Anni92@yahoo.com'
        },
        {
          nombre_emp: 'Manuel',
          apellido_emp: 'de Jesús',
          foto_emp: '',
          ci_emp: 22899757,
          password_emp: 'Admin.123',
          estado_emp: '1',
          celular_emp: 70794568,
          usuario_emp: 'Josep',
          email_emp: 'Manuel.Turcotte53@yahoo.com'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Empleados', null, {})
  }
}
