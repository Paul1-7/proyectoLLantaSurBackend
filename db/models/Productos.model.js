const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { CATEGORIES_TABLE } = require('./Categorias.model.js')
const { BRANDS_TABLE } = require('./Marcas.model.js')
const { PROVIDER_TABLE } = require('./Proveedores.model.js')

const PRODUCTS_TABLE = 'Productos'

const ProductsSchema = {
  id: {
    type: DataTypes.STRING,
    comment: 'identificador del registro',
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    validate: {
      isUUID: 4
    }
  },
  imagen: {
    type: DataTypes.STRING,
    comment: 'url de la imagen del producto',

    allowNull: true
  },
  idImg: {
    type: DataTypes.STRING,
    comment: 'identificador de la imagen del producto',

    allowNull: true,
    field: 'id_img'
  },
  nombre: {
    type: DataTypes.STRING,
    comment: 'nombre del producto',

    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    comment: 'descripcion del producto',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  precioCompra: {
    type: DataTypes.FLOAT,
    field: 'precio_compra',
    comment: 'precio de compra del producto',

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
    comment: 'precio de venta del producto',

    allowNull: true,
    validate: {
      isFloat: msg.isFloat,
      isGreaterThan(value) {
        if (parseInt(value) < parseInt(this.precioCompra)) {
          throw new Error(msg.msgIsGreaterThan)
        }
      }
    }
  },
  fecha: {
    type: DataTypes.DATE,
    comment: 'fecha de registro del producto',

    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    comment: 'estado del producto',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  },
  stockMin: {
    type: DataTypes.INTEGER,
    field: 'stock_min',
    comment: 'cantidad minima del producto',
    allowNull: false,
    defaultValue: 1
  },
  codReferencia: {
    type: DataTypes.STRING,
    field: 'cod_referencia',
    comment: 'código de referencia del producto',
    allowNull: false
  },
  idProv: {
    type: DataTypes.STRING,
    comment: 'identificador del proveedor',

    field: 'id_prov',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: PROVIDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idMarca: {
    type: DataTypes.STRING,
    comment: 'identificador de la marca',

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
    comment: 'identificador de la categoria',

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
    this.hasMany(models.DetalleCompras, {
      foreignKey: 'idProd',
      as: 'detalleCompras'
    })
    this.hasMany(models.DetalleVentas, {
      foreignKey: 'idProd',
      as: 'detalleVentas'
    })
    this.hasMany(models.MovimientosSucursales, {
      foreignKey: 'idProd'
    })
    this.hasMany(models.ProductosDefectuosos, {
      foreignKey: 'idProd',
      as: 'productosDefectuosos'
    })
    this.hasMany(models.DescuentosProductos, {
      foreignKey: 'idProd',
      as: 'descuentosProductos'
    })
    this.hasMany(models.SlidersImages, {
      foreignKey: 'idProd',
      as: 'slider'
    })
    this.belongsToMany(models.Descuentos, {
      through: models.DescuentosProductos,
      as: 'descuentos',
      foreignKey: 'idProd',
      otherKey: 'idDesc'
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
      through: models.SucursalesProductos,
      as: 'sucursales',
      foreignKey: 'idProd',
      otherKey: 'idSuc'
    })
    this.hasMany(models.SucursalesProductos, {
      foreignKey: 'idProd',
      as: 'sucursalesProductos'
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
