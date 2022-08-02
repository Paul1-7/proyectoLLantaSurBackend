const { EmployeesSchema } = require('../models/Empleados.model.js')
const { PurchaseSchema } = require('../models/Compras.model.js')
const { BusinessDataSchema } = require('../models/DatosNegocio.model.js')
const { ProviderSchema } = require('../models/Proveedores.model.js')
const { RolSchema } = require('../models/Roles.model.js')
const { CustomerSchema } = require('../models/Cliente.model.js')
const { SellsSchema } = require('../models/Ventas.model.js')
const { OrdersSchema } = require('../models/Pedidos.model.js')
const { CategoriesSchema } = require('../models/Categorias.model.js')
const { BrandsSchema } = require('../models/Marcas.model.js')
const { ProductsSchema } = require('../models/Productos.model.js')
const { PurchaseDetailSchema } = require('../models/DetalleCompras.model.js')
const { OrdersDetailSchema } = require('../models/DetallePedidos.model.js')
const { SellsDetailSchema } = require('../models/DetalleVentas.model.js')
const {
  DefectiveProductsSchema
} = require('../models/ProductosDefectuosos.model.js')
const { DiscountsSchema } = require('../models/Descuentos.model.js')
const { ReviewsSchema } = require('../models/Reviews.model.js')
const { RolEmployeesSchema } = require('../models/RolesEmpleados.model.js')
const {
  DiscountsProductsSchema
} = require('../models/DescuentosProductos.model.js')
const { FavoritesSchema } = require('../models/Favoritos.model.js')
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Empleados', EmployeesSchema)
    await queryInterface.createTable('Roles', RolSchema)
    await queryInterface.createTable('Roles_Empleados', RolEmployeesSchema)
    await queryInterface.createTable('Categorias', CategoriesSchema)
    await queryInterface.createTable('Marcas', BrandsSchema)
    await queryInterface.createTable('Datos_Negocio', BusinessDataSchema)
    await queryInterface.createTable('Proveedores', ProviderSchema)
    await queryInterface.createTable('Compras', PurchaseSchema)
    await queryInterface.createTable('Productos', ProductsSchema)
    await queryInterface.createTable('Clientes', CustomerSchema)
    await queryInterface.createTable('Pedidos', OrdersSchema)
    await queryInterface.createTable('Ventas', SellsSchema)
    await queryInterface.createTable('Detalle_Compras', PurchaseDetailSchema)
    await queryInterface.createTable('Detalle_Pedidos', OrdersDetailSchema)
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Empleados')
    await queryInterface.dropTable('Compras')
    await queryInterface.dropTable('Datos_Negocio')
    await queryInterface.dropTable('Proveedores')
    await queryInterface.dropTable('Roles')
    await queryInterface.dropTable('Clientes')
    await queryInterface.dropTable('Ventas')
    await queryInterface.dropTable('Pedidos')
    await queryInterface.dropTable('Categorias')
    await queryInterface.dropTable('Marcas')
    await queryInterface.dropTable('Productos')
    await queryInterface.dropTable('Detalle_Compras')
    await queryInterface.dropTable('Detalle_Pedidos')
    await queryInterface.dropTable('Detalle_Ventas')
    await queryInterface.dropTable('Productos_Defectuosos')
    await queryInterface.dropTable('Descuentos')
    await queryInterface.dropTable('Reviews')
    await queryInterface.dropTable('Descuentos_Productos')
    await queryInterface.dropTable('Favoritos')
    await queryInterface.dropTable('Roles_Empleados')
  }
}
