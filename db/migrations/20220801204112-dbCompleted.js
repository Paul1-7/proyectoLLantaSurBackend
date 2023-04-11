const { PurchaseSchema } = require('../models/Compras.model.js')
const { BusinessDataSchema } = require('../models/DatosNegocio.model.js')
const { ProviderSchema } = require('../models/Proveedores.model.js')
const { RolSchema } = require('../models/Roles.model.js')
const { SellsSchema } = require('../models/Ventas.model.js')
const { OrdersSchema } = require('../models/Pedidos.model.js')
const { CategoriesSchema } = require('../models/Categorias.model.js')
const { BrandsSchema } = require('../models/Marcas.model.js')
const { ProductsSchema } = require('../models/Productos.model.js')
const { PurchaseDetailSchema } = require('../models/DetalleCompras.model.js')

const { SellsDetailSchema } = require('../models/DetalleVentas.model.js')
const {
  DefectiveProductsSchema
} = require('../models/ProductosDefectuosos.model.js')
const { DiscountsSchema } = require('../models/Descuentos.model.js')
const { ReviewsSchema } = require('../models/Reviews.model.js')

const {
  DiscountsProductsSchema
} = require('../models/DescuentosProductos.model.js')
const { FavoritesSchema } = require('../models/Favoritos.model.js')
const { SubsidiariesSchema } = require('../models/Sucursales.model.js')
const {
  SubsidiariesProductsSchema
} = require('../models/SucursalesProductos.model.js')
const {
  InvoiceBatchingSchema
} = require('../models/DosificacionFacturas.model.js')
const { RolUsersSchema } = require('../models/RolesUsuarios.model.js')
const { UserSchema } = require('../models/Usuarios.model.js')
const { SlidersImagesSchema } = require('../models/SlidersImages.model.js')
const {
  InterBranchMovementsSchema
} = require('../models/MovimientosSucursales.model.js')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'DosificacionFacturas',
      InvoiceBatchingSchema
    )
    await queryInterface.createTable('Sucursales', SubsidiariesSchema)
    await queryInterface.createTable('Usuarios', UserSchema)
    await queryInterface.createTable('Roles', RolSchema)
    await queryInterface.createTable('RolesUsuarios', RolUsersSchema)
    await queryInterface.createTable('Categorias', CategoriesSchema)
    await queryInterface.createTable('Marcas', BrandsSchema)
    await queryInterface.createTable('DatosNegocio', BusinessDataSchema)
    await queryInterface.createTable('Proveedores', ProviderSchema)
    await queryInterface.createTable('Compras', PurchaseSchema)
    await queryInterface.createTable('Productos', ProductsSchema)
    await queryInterface.createTable('Ventas', SellsSchema)
    await queryInterface.createTable('Pedidos', OrdersSchema)
    await queryInterface.createTable('DetalleCompras', PurchaseDetailSchema)

    await queryInterface.createTable('DetalleVentas', SellsDetailSchema)
    await queryInterface.createTable(
      'ProductosDefectuosos',
      DefectiveProductsSchema
    )
    await queryInterface.createTable('Descuentos', DiscountsSchema)
    await queryInterface.createTable('Reviews', ReviewsSchema)
    await queryInterface.createTable(
      'DescuentosProductos',
      DiscountsProductsSchema
    )
    await queryInterface.createTable('Favoritos', FavoritesSchema)
    await queryInterface.createTable(
      'SucursalesProductos',
      SubsidiariesProductsSchema
    )
    await queryInterface.createTable('SlidersImages', SlidersImagesSchema)
    await queryInterface.createTable(
      'MovimientosSucursales',
      InterBranchMovementsSchema
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MovimientosSucursales')
    await queryInterface.dropTable('SlidersImages')
    await queryInterface.dropTable('SucursalesProductos')
    await queryInterface.dropTable('DetalleCompras')
    await queryInterface.dropTable('DetalleVentas')
    await queryInterface.dropTable('Favoritos')
    await queryInterface.dropTable('RolesUsuarios')
    await queryInterface.dropTable('Pedidos')

    await queryInterface.dropTable('Reviews')
    await queryInterface.dropTable('DescuentosProductos')
    await queryInterface.dropTable('Compras')
    await queryInterface.dropTable('Roles')
    await queryInterface.dropTable('ProductosDefectuosos')
    await queryInterface.dropTable('Productos')
    await queryInterface.dropTable('Proveedores')
    await queryInterface.dropTable('Descuentos')
    await queryInterface.dropTable('Categorias')
    await queryInterface.dropTable('Marcas')
    await queryInterface.dropTable('Ventas')
    await queryInterface.dropTable('Usuarios')
    await queryInterface.dropTable('Sucursales')
    await queryInterface.dropTable('DatosNegocio')
    await queryInterface.dropTable('DosificacionFacturas')
  }
}
