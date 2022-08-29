const { Purchase, PurchaseSchema } = require('./Compras.model.js')
const { BusinessData, BusinessDataSchema } = require('./DatosNegocio.model.js')
const { Provider, ProviderSchema } = require('./Proveedores.model.js')
const { Rol, RolSchema } = require('./Roles.model.js')
const { Sells, SellsSchema } = require('./Ventas.model.js')
const { Orders, OrdersSchema } = require('./Pedidos.model.js')
const { Categories, CategoriesSchema } = require('./Categorias.model.js')
const { Brands, BrandsSchema } = require('./Marcas.model.js')
const { Products, ProductsSchema } = require('./Productos.model.js')
const {
  PurchaseDetail,
  PurchaseDetailSchema
} = require('./DetalleCompras.model.js')
const {
  OrdersDetail,
  OrdersDetailSchema
} = require('./DetallePedidos.model.js')
const { SellsDetail, SellsDetailSchema } = require('./DetalleVentas.model.js')
const {
  DefectiveProducts,
  DefectiveProductsSchema
} = require('./ProductosDefectuosos.model.js')
const { Discounts, DiscountsSchema } = require('./Descuentos.model.js')
const { Reviews, ReviewsSchema } = require('./Reviews.model.js')
const { RolUsers, RolUsersSchema } = require('./RolesUsuarios.model.js')
const {
  DiscountsProducts,
  DiscountsProductsSchema
} = require('./DescuentosProductos.model.js')
const { Favorites, FavoritesSchema } = require('./Favoritos.model.js')
const { Subsidiaries, SubsidiariesSchema } = require('./Sucursales.model.js')
const {
  SubsidiariesProducts,
  SubsidiariesProductsSchema
} = require('./SucursalesProductos.model.js')
const { User, UserSchema } = require('./Usuarios.model.js')

function setUpModels(sequelize) {
  Subsidiaries.init(SubsidiariesSchema, Subsidiaries.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
  // Customer.init(CustomerSchema, Customer.config(sequelize))
  Rol.init(RolSchema, Rol.config(sequelize))
  // Employees.init(EmployeesSchema, Employees.config(sequelize))
  RolUsers.init(RolUsersSchema, RolUsers.config(sequelize))
  BusinessData.init(BusinessDataSchema, BusinessData.config(sequelize))
  Provider.init(ProviderSchema, Provider.config(sequelize))
  Purchase.init(PurchaseSchema, Purchase.config(sequelize))
  Sells.init(SellsSchema, Sells.config(sequelize))
  Orders.init(OrdersSchema, Orders.config(sequelize))
  Categories.init(CategoriesSchema, Categories.config(sequelize))
  Brands.init(BrandsSchema, Brands.config(sequelize))
  Products.init(ProductsSchema, Products.config(sequelize))
  PurchaseDetail.init(PurchaseDetailSchema, PurchaseDetail.config(sequelize))
  OrdersDetail.init(OrdersDetailSchema, OrdersDetail.config(sequelize))
  SellsDetail.init(SellsDetailSchema, SellsDetail.config(sequelize))
  DefectiveProducts.init(
    DefectiveProductsSchema,
    DefectiveProducts.config(sequelize)
  )
  Discounts.init(DiscountsSchema, Discounts.config(sequelize))
  Reviews.init(ReviewsSchema, Reviews.config(sequelize))
  DiscountsProducts.init(
    DiscountsProductsSchema,
    DiscountsProducts.config(sequelize)
  )
  Favorites.init(FavoritesSchema, Favorites.config(sequelize))
  SubsidiariesProducts.init(
    SubsidiariesProductsSchema,
    SubsidiariesProducts.config(sequelize)
  )

  Subsidiaries.associate(sequelize.models)
  User.associate(sequelize.models)
  Rol.associate(sequelize.models)
  RolUsers.associate(sequelize.models)
  Provider.associate(sequelize.models)
  Purchase.associate(sequelize.models)
  Sells.associate(sequelize.models)
  Orders.associate(sequelize.models)
  Categories.associate(sequelize.models)
  Brands.associate(sequelize.models)
  Products.associate(sequelize.models)
  DefectiveProducts.associate(sequelize.models)
  Discounts.associate(sequelize.models)
  Reviews.associate(sequelize.models)
  Favorites.associate(sequelize.models)
  DiscountsProducts.associate(sequelize.models)
  OrdersDetail.associate(sequelize.models)
  PurchaseDetail.associate(sequelize.models)
  SellsDetail.associate(sequelize.models)
  SubsidiariesProducts.associate(sequelize.models)
}

module.exports = setUpModels
