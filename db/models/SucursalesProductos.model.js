const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const { SUBSIDIARIES_TABLE } = require('./Sucursales.model.js')

const SUBSIDIARIES_PRODUCTS_TABLE = 'Sucursales_Productos'

const SubsidiariesProductsSchema = {
  idSucProd: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_suc_prod',
    validate: {
      isUUID: 4
    }
  },
  stockProd: {
    type: DataTypes.INTEGER,
    field: 'stock_prod',
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
    field: 'id_suc',
    references: {
      model: SUBSIDIARIES_TABLE,
      key: 'id_suc'
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
  static associate(models) {}

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
