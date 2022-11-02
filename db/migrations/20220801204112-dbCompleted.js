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
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Dosificacion_Facturas',
      InvoiceBatchingSchema
    )
    await queryInterface.createTable('Sucursales', SubsidiariesSchema)
    await queryInterface.createTable('Usuarios', UserSchema)
    await queryInterface.createTable('Roles', RolSchema)
    await queryInterface.createTable('Roles_Usuarios', RolUsersSchema)
    await queryInterface.createTable('Categorias', CategoriesSchema)
    await queryInterface.createTable('Marcas', BrandsSchema)
    await queryInterface.createTable('Datos_Negocio', BusinessDataSchema)
    await queryInterface.createTable('Proveedores', ProviderSchema)
    await queryInterface.createTable('Compras', PurchaseSchema)
    await queryInterface.createTable('Productos', ProductsSchema)
    await queryInterface.createTable('Ventas', SellsSchema)
    await queryInterface.createTable('Pedidos', OrdersSchema)
    await queryInterface.createTable('Detalle_Compras', PurchaseDetailSchema)

    await queryInterface.createTable('Detalle_Ventas', SellsDetailSchema)
    await queryInterface.createTable(
      'Productos_Defectuosos',
      DefectiveProductsSchema
    )
    await queryInterface.createTable('Descuentos', DiscountsSchema)
    await queryInterface.createTable('Reviews', ReviewsSchema)
    await queryInterface.createTable(
      'Descuentos_Productos',
      DiscountsProductsSchema
    )
    await queryInterface.createTable('Favoritos', FavoritesSchema)
    await queryInterface.createTable(
      'Sucursales_Productos',
      SubsidiariesProductsSchema
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sucursales_Productos')
    await queryInterface.dropTable('Detalle_Compras')
    await queryInterface.dropTable('Detalle_Ventas')
    await queryInterface.dropTable('Favoritos')
    await queryInterface.dropTable('Roles_Usuarios')
    await queryInterface.dropTable('Pedidos')
    await queryInterface.dropTable('Ventas')
    await queryInterface.dropTable('Reviews')
    await queryInterface.dropTable('Descuentos_Productos')
    await queryInterface.dropTable('Compras')
    await queryInterface.dropTable('Roles')
    await queryInterface.dropTable('Productos_Defectuosos')
    await queryInterface.dropTable('Productos')
    await queryInterface.dropTable('Proveedores')
    await queryInterface.dropTable('Descuentos')
    await queryInterface.dropTable('Categorias')
    await queryInterface.dropTable('Marcas')
    await queryInterface.dropTable('Usuarios')
    await queryInterface.dropTable('Sucursales')
    await queryInterface.dropTable('Datos_Negocio')
    await queryInterface.dropTable('Dosificacion_Facturas')
  }
}
