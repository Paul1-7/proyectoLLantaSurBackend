const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { CATEGORIES_TABLE } = require('./Categorias.model.js')
const { BRANDS_TABLE } = require('./Marcas.model.js')
const { PROVIDER_TABLE } = require('./Proveedores.model.js')

const PRODUCTS_TABLE = 'Productos'

const ProductsSchema = {
  idProd: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: 'id_prod',
    validate: {
      isInt: true
    }
  },
  imagenProd: {
    type: DataTypes.STRING,
    field: 'imagen_prod',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  nombreProd: {
    type: DataTypes.STRING,
    field: 'nombre_prod',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  stockProd: {
    type: DataTypes.INTEGER,
    field: 'stock_prod',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  precioCompra: {
    type: DataTypes.FLOAT,
    field: 'precio_compra',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  precioVenta: {
    type: DataTypes.FLOAT,
    field: 'precio_venta',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  fechaProd: {
    type: DataTypes.DATE,
    field: 'fecha_prod',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  estadoProd: {
    type: DataTypes.INTEGER,
    field: 'estado_prod',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  },
  idProv: {
    type: DataTypes.INTEGER,
    field: 'id_prov',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric
    },
    references: {
      model: PROVIDER_TABLE,
      key: 'id_prov'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idMarca: {
    type: DataTypes.INTEGER,
    field: 'id_marca',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric
    },
    references: {
      model: BRANDS_TABLE,
      key: 'id_marca'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idCat: {
    type: DataTypes.INTEGER,
    field: 'id_cat',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric
    },
    references: {
      model: CATEGORIES_TABLE,
      key: 'id_cat'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Products extends Model {
  static associate(models) {
    this.belongsTo(models.Categorias, { foreignKey: 'id_cat' })
    this.belongsTo(models.Proveedores, { foreignKey: 'id_prov' })
    this.belongsTo(models.Marcas, { foreignKey: 'id_marca' })
    this.hasMany(models.Detalle_Compras, {
      foreignKey: 'id_prod'
    })
    this.hasMany(models.Detalle_Pedidos, {
      foreignKey: 'id_prod'
    })
    this.hasMany(models.Detalle_Ventas, {
      foreignKey: 'id_prod'
    })
    this.hasMany(models.Productos_Defectuosos, { foreignKey: 'id_prod' })
    this.hasMany(models.Descuentos_Productos, { foreignKey: 'id_prod' })
    this.hasMany(models.Favoritos, {
      foreignKey: 'id_prod'
    })
    this.hasMany(models.Reviews, {
      foreignKey: 'id_prod'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: PRODUCTS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Products, ProductsSchema, PRODUCTS_TABLE }
