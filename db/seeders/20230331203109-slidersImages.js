'use strict'

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Sliders_Images',
      [
        {
          id: '594bbe5e-7f9b-4e4f-8d78-45e9c4062e65',
          id_prod: 'e9933c06-cd03-4990-bf8e-b8e9056b33df',
          url_img:
            'https://res.cloudinary.com/paul1-7/image/upload/v1680308403/llanta-sur/Slider%20de%20images/correaSlider_bhrgm4.webp',
          estado: 1
        },
        {
          id: '891eb9ed-52e8-44f1-9d62-7ae1ec899317',
          id_prod: '14f23bde-837c-4f51-bb6a-2ddce96f4728',
          url_img:
            'https://res.cloudinary.com/paul1-7/image/upload/v1680308403/llanta-sur/Slider%20de%20images/luzSlider_la0hoi.webp',
          estado: 1
        },
        {
          id: '129af063-2630-4c29-9578-2eac273b6a35',
          id_prod: 'fa4eebc4-b6fc-4028-a027-0e7a5477372e',
          url_img:
            'https://res.cloudinary.com/paul1-7/image/upload/v1680308403/llanta-sur/Slider%20de%20images/aros-slider_yyydlv.webp',
          estado: 1
        },
        {
          id: 'a0427db8-220a-4b4f-9ade-f13fb5bf1b1c',
          id_prod: 'ea6f9e29-3715-434a-93bd-76d9e578c156',
          url_img:
            'https://res.cloudinary.com/paul1-7/image/upload/v1680308403/llanta-sur/Slider%20de%20images/Mesa_de_trabajo_1_rp3mal.webp',
          estado: 1
        },
        {
          id: '2332d266-030f-4114-864d-8a52cefab194',
          id_prod: 'bd029433-2a9e-4e14-991a-96e031344c42',
          url_img:
            'https://res.cloudinary.com/paul1-7/image/upload/v1680308402/llanta-sur/Slider%20de%20images/aceiteSlider_tf8qus.webp',
          estado: 0
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sliders_Images', null, {})
  }
}
