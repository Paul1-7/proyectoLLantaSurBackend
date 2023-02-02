'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categorias',
      [
        {
          id: '63c6fa6a-8819-402f-8f14-309c91ca35a0',
          nombre: 'Iluminación',
          url: 'iluminacion',
          descripcion: 'Todo tipo de luces',
          estado: 1
        },
        {
          id: 'b2b54c0a-358c-4d85-bce5-50a2df397425',
          nombre: 'Embragues',
          url: 'embragues',
          descripcion: 'Todo tipo de embragues',
          estado: 1
        },
        {
          id: '7f746328-db46-4787-89e1-e209ab6a6683',
          nombre: 'Motores',
          url: 'motores',
          descripcion: 'partes de todo tipo de motores',
          estado: 1
        },
        {
          id: '43e8cf27-f7c7-4609-9651-1c308522060e',
          nombre: 'Espejos',
          url: 'espejos',
          descripcion: 'Todo tipo de espejos',
          estado: 1
        },
        {
          id: 'b8bed901-09c1-4f77-8bf7-b89d14531663',
          nombre: 'Llantas',
          url: 'llantas',
          descripcion: 'Todo tipo de llantas',
          estado: 1
        },
        {
          id: '02dc1323-2be7-41b0-a0fb-d88f0bcb391a',
          nombre: 'Amortiguadores',
          url: 'amortiguadores',
          descripcion: 'Todo tipo de amortiguadores',
          estado: 1
        },
        {
          id: '8782dedb-1bf8-4370-897e-6ff8abd1ad66',
          nombre: 'Aros',
          url: 'aros',
          descripcion: 'Todo tipo de aros para llantas',
          estado: 1
        },
        {
          id: '02134a58-1c9d-4ce8-b3c4-457cc78214c9',
          nombre: 'Frenos',
          url: 'frenos',
          descripcion: 'Todo tipo de frenos',
          estado: 1
        },
        {
          id: '04bac20e-3363-490e-8914-4d24885f4ce1',
          nombre: 'Aceites',
          url: 'aceites',
          descripcion: 'Todo tipo de aceites para motor',
          estado: 1
        },
        {
          id: 'aa440cd4-c073-4ff1-971a-40003bdd3194',
          nombre: 'Accesorios',
          url: 'accesorios',
          descripcion: 'Todo tipo de accesorios para vehículos',
          estado: 1
        },
        {
          id: 'cd2903ff-0dcf-4cce-a7ea-bf4e02e84e84',
          nombre: 'Filtros',
          url: 'filtros',
          descripcion: 'Todo tipo de filtros para motor',
          estado: 1
        },
        {
          id: '82038ae3-f00b-44e4-876c-03c49caec682',
          nombre: 'Herramientas',
          url: 'herramientas',
          descripcion: 'Todo tipo de herramientas',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias', null, {})
  }
}
