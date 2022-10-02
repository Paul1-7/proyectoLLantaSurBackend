module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Proveedores',
      [
        {
          id: '0fa4dd51-931c-47e9-9e90-4b00f58169e0',
          nombre: 'Gomexportires',
          tel: '+568 176316812',
          nombre_enc: 'Juan',
          ap_enc: 'Perez',
          estado: 1
        },
        {
          id: 'ea9a46d6-3520-4f6c-8f53-7ba1afc82e7f',
          nombre: '07ZR',
          tel: '+568 914141898',
          nombre_enc: 'Lucas',
          ap_enc: 'Carrasco',
          estado: 1
        },
        {
          id: '1ded6ca7-9b4a-43f3-9773-5a7dab99730c',
          nombre: 'Cojapan',
          tel: '+52 2326265',
          nombre_enc: 'Carlos',
          ap_enc: 'Gonzales',
          estado: 1
        },
        {
          id: '4b246b2d-340c-4da1-b045-774332ca4b9f',
          nombre: 'Autorex',
          tel: '+55 56890089',
          nombre_enc: 'Matias',
          ap_enc: 'Rojas',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Proveedores', null, {})
  }
}
