const { Model, DataTypes } = require('sequelize')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const { SUBSIDIARIES_TABLE } = require('./Sucursales.model.js')

const SUBSIDIARIES_PRODUCTS_TABLE = 'Sucursales_Productos'

const SubsidiariesProductsSchema = {
  idSucProd: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_suc_prod',
    validate: {
      isInt: true
    }
  },
  idSuc: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_suc',
    references: {
      model: SUBSIDIARIES_TABLE,
      key: 'id_suc'
    },
    validate: {
      isInt: true
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idProd: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_prod',
    references: {
      model: PRODUCTS_TABLE,
      key: 'id_prod'
    },
    validate: {
      isInt: true
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
