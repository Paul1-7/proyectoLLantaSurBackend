module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Proveedores',
      [
        {
          nombre_prov: 'Gomexportires',
          tel_prov: '+568 176316812',
          nombre_enc_prov: 'Juan',
          ap_enc_prov: 'Perez',
          estado: 1
        },
        {
          nombre_prov: '07ZR',
          tel_prov: '+568 914141898',
          nombre_enc_prov: 'Lucas',
          ap_enc_prov: 'Carrasco',
          estado: 1
        },
        {
          nombre_prov: 'Cojapan',
          tel_prov: '+52 2326265',
          nombre_enc_prov: 'Carlos',
          ap_enc_prov: 'Gonzales',
          estado: 1
        },
        {
          nombre_prov: 'Autorex',
          tel_prov: '+55 56890089',
          nombre_enc_prov: 'Matias',
          ap_enc_prov: 'Rojas',
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
