'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert(
    //   'Empleados',
    //   [
    //     {
    //       id_emp: '70d336bb-1e6f-4c3d-b048-01e329b5c3fd',
    //       nombre_emp: 'Josep',
    //       apellido_emp: 'Guillén',
    //       foto_emp: '',
    //       estado_emp: '1',
    //       id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
    //       id_usuario: 'd2b5da00-fea5-44fd-ba59-fb3aff74f7ef'
    //     },
    //     {
    //       id_emp: '712c8f32-67e1-46ad-84ea-3538ff2ffbf8',
    //       nombre_emp: 'Josep',
    //       apellido_emp: 'Pichardo',
    //       foto_emp: '',
    //       estado_emp: '1',
    //       id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
    //       id_usuario: 'ace0fc3f-b172-4905-b2db-2865cf98678b'
    //     },
    //     {
    //       id_emp: '2ceff9c5-f4f2-4e34-88ac-100156de8f71',
    //       nombre_emp: 'Maica',
    //       apellido_emp: 'Cepeda',
    //       foto_emp: '',
    //       estado_emp: '1',
    //       id_suc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
    //       id_usuario: 'd9a4f84b-e659-44b5-b6ce-16eae57e31f3'
    //     },
    //     {
    //       id_emp: '1664a070-98a5-4162-84e6-92591a3849b4',
    //       nombre_emp: 'Anni',
    //       apellido_emp: 'Reynoso',
    //       foto_emp: '',
    //       estado_emp: '1',
    //       id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
    //       id_usuario: '324c2f1d-3aa8-4bdb-b646-1f9f6847f3b0'
    //     },
    //     {
    //       id_emp: '22255365-d720-4ac1-b026-5fa9f65ae87e',
    //       nombre_emp: 'Manuel',
    //       apellido_emp: 'de Jesús',
    //       foto_emp: '',
    //       estado_emp: '1',
    //       id_suc: 'ad8cd9f1-1028-4c5f-ae20-3ed58113013d',
    //       id_usuario: 'b60047b1-a9f2-4309-9fcd-1868785dfb5a'
    //     }
    //   ],
    //   {}
    // )
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Empleados', null, {})
  }
}
