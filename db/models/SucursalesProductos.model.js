const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const { SUBSIDIARIES_TABLE } = require('./Sucursales.model.js')

const SUBSIDIARIES_PRODUCTS_TABLE = 'Sucursales_Productos'

const SubsidiariesProductsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador del registro',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    comment: 'stock de la sucursal',

    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull,
      min: msg.minValue
    }
  },
  idSuc: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador de la sucursal',

    field: 'id_suc',
    references: {
      model: SUBSIDIARIES_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idProd: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador del producto',

    field: 'id_prod',
    references: {
      model: PRODUCTS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class SubsidiariesProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Sucursales, {
      foreignKey: 'idSuc',
      as: 'sucursal'
    })
    this.belongsTo(models.Productos, {
      foreignKey: 'idProd',
      as: 'producto'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBSIDIARIES_PRODUCTS_TABLE,
      modelName: SUBSIDIARIES_PRODUCTS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  SubsidiariesProducts,
  SubsidiariesProductsSchema,
  SUBSIDIARIES_PRODUCTS_TABLE
}
