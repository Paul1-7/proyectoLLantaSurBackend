'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categorias',
      [
        {
          id_categoria: '63c6fa6a-8819-402f-8f14-309c91ca35a0',
          nombre_cat: 'Iluminación',
          desc_cat: 'Todo tipo de luces',
          estado_cat: 1
        },
        {
          id_categoria: 'b2b54c0a-358c-4d85-bce5-50a2df397425',
          nombre_cat: 'Embragues',
          desc_cat: 'Todo tipo de embragues',
          estado_cat: 1
        },
        {
          id_categoria: '7f746328-db46-4787-89e1-e209ab6a6683',
          nombre_cat: 'Motores',
          desc_cat: 'partes de todo tipo de motores',
          estado_cat: 1
        },
        {
          id_categoria: '43e8cf27-f7c7-4609-9651-1c308522060e',
          nombre_cat: 'Espejos',
          desc_cat: 'Todo tipo de espejos',
          estado_cat: 1
        },
        {
          id_categoria: 'b8bed901-09c1-4f77-8bf7-b89d14531663',
          nombre_cat: 'Llantas',
          desc_cat: 'Todo tipo de llantas',
          estado_cat: 1
        },
        {
          id_categoria: '02dc1323-2be7-41b0-a0fb-d88f0bcb391a',
          nombre_cat: 'Amortiguadores',
          desc_cat: 'Todo tipo de amortiguadores',
          estado_cat: 1
        },
        {
          id_categoria: '8782dedb-1bf8-4370-897e-6ff8abd1ad66',
          nombre_cat: 'Aros',
          desc_cat: 'Todo tipo de aros para llantas',
          estado_cat: 1
        },
        {
          id_categoria: '02134a58-1c9d-4ce8-b3c4-457cc78214c9',
          nombre_cat: 'Frenos',
          desc_cat: 'Todo tipo de frenos',
          estado_cat: 1
        },
        {
          id_categoria: '04bac20e-3363-490e-8914-4d24885f4ce1',
          nombre_cat: 'Aceites',
          desc_cat: 'Todo tipo de aceites para motor',
          estado_cat: 1
        },
        {
          id_categoria: 'aa440cd4-c073-4ff1-971a-40003bdd3194',
          nombre_cat: 'Accesorios',
          desc_cat: 'Todo tipo de accesorios para vehículos',
          estado_cat: 1
        },
        {
          id_categoria: 'cd2903ff-0dcf-4cce-a7ea-bf4e02e84e84',
          nombre_cat: 'Filtros',
          desc_cat: 'Todo tipo de filtros para motor',
          estado_cat: 1
        },
        {
          id_categoria: '82038ae3-f00b-44e4-876c-03c49caec682',
          nombre_cat: 'Herramientas',
          desc_cat: 'Todo tipo de herramientas',
          estado_cat: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias', null, {})
  }
}
