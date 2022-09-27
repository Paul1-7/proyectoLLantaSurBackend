const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { CATEGORIES_TABLE } = require('./Categorias.model.js')
const { BRANDS_TABLE } = require('./Marcas.model.js')
const { PROVIDER_TABLE } = require('./Proveedores.model.js')

const PRODUCTS_TABLE = 'Productos'

const ProductsSchema = {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    validate: {
      isUUID: 4
    }
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  idImg: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'id_img'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  precioCompra: {
    type: DataTypes.FLOAT,
    field: 'precio_compra',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull,
      isGreaterThanOrEqual(value) {
        if (parseFloat(value) <= 0) {
          throw new Error(msg.msgPositiveNumber)
        }
      }
    }
  },
  precioVenta: {
    type: DataTypes.FLOAT,
    field: 'precio_venta',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull,
      isGreaterThan(value) {
        if (parseInt(value) < parseInt(this.precioCompra)) {
          throw new Error(msg.msgIsGreaterThan)
        }
      }
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  },
  idProv: {
    type: DataTypes.STRING,
    field: 'id_prov',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: PROVIDER_TABLE,
      key: 'id_prov'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idMarca: {
    type: DataTypes.STRING,
    field: 'id_marca',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: BRANDS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idCat: {
    type: DataTypes.STRING,
    field: 'id_cat',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: CATEGORIES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Products extends Model {
  static associate(models) {
    this.belongsTo(models.Categorias, { foreignKey: 'idCat', as: 'categoria' })
    this.belongsTo(models.Proveedores, {
      foreignKey: 'idProv',
      as: 'proveedor'
    })
    this.belongsTo(models.Marcas, { foreignKey: 'idMarca', as: 'marca' })
    this.hasMany(models.Detalle_Compras, {
      foreignKey: 'idProd',
      as: 'detalleCompras'
    })
    this.hasMany(models.Detalle_Ventas, {
      foreignKey: 'idProd',
      as: 'detalleVentas'
    })
    this.hasMany(models.Productos_Defectuosos, {
      foreignKey: 'idProd',
      as: 'productosDefectuosos'
    })
    this.hasMany(models.Descuentos_Productos, {
      foreignKey: 'idProd',
      as: 'descuentosPorductos'
    })
    this.hasMany(models.Favoritos, {
      foreignKey: 'idProd',
      as: 'favoritos'
    })
    this.hasMany(models.Reviews, {
      foreignKey: 'idProd',
      as: 'reviews'
    })
    this.belongsToMany(models.Sucursales, {
      through: models.Sucursales_Productos,
      as: 'sucursales',
      foreignKey: 'idProd',
      otherKey: 'idSuc'
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
