module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Proveedores',
      [
        {
          id_prov: '0fa4dd51-931c-47e9-9e90-4b00f58169e0',
          nombre_prov: 'Gomexportires',
          tel_prov: '+568 176316812',
          nombre_enc_prov: 'Juan',
          ap_enc_prov: 'Perez',
          estado_prov: 1
        },
        {
          id_prov: 'ea9a46d6-3520-4f6c-8f53-7ba1afc82e7f',
          nombre_prov: '07ZR',
          tel_prov: '+568 914141898',
          nombre_enc_prov: 'Lucas',
          ap_enc_prov: 'Carrasco',
          estado_prov: 1
        },
        {
          id_prov: '1ded6ca7-9b4a-43f3-9773-5a7dab99730c',
          nombre_prov: 'Cojapan',
          tel_prov: '+52 2326265',
          nombre_enc_prov: 'Carlos',
          ap_enc_prov: 'Gonzales',
          estado_prov: 1
        },
        {
          id_prov: '4b246b2d-340c-4da1-b045-774332ca4b9f',
          nombre_prov: 'Autorex',
          tel_prov: '+55 56890089',
          nombre_enc_prov: 'Matias',
          ap_enc_prov: 'Rojas',
          estado_prov: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Proveedores', null, {})
  }
}
