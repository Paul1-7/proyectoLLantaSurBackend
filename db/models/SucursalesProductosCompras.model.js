const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const {
  SUBSIDIARIES_PRODUCTS_TABLE
} = require('./SucursalesProductos.model.js')
const { PURCHASE_TABLE } = require('./Compras.model.js')

const SUBSIDIARIES_PRODUCTS_PURCHASESTABLE = 'SucursalesProductosCompras'

const SubsidiariesProductsPurchasesSchema = {
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
    comment: 'stock de la sucursal por parte de la compra',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull,
      min: msg.minValue
    }
  },
  idSucProd: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador de sucursalesProductos',

    field: 'id_suc_prod',
    references: {
      model: SUBSIDIARIES_PRODUCTS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idCompra: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador de la compra',
    field: 'id_compra',
    references: {
      model: PURCHASE_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class SubsidiariesProductsPurchases extends Model {
  static associate(models) {
    this.belongsTo(models.SucursalesProductos, {
      foreignKey: 'idSucProd'
    })
    this.belongsTo(models.Compras, {
      foreignKey: 'idCompra'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBSIDIARIES_PRODUCTS_PURCHASESTABLE,
      modelName: SUBSIDIARIES_PRODUCTS_PURCHASESTABLE,
      timestamps: false
    }
  }
}

module.exports = {
  SubsidiariesProductsPurchases,
  SubsidiariesProductsPurchasesSchema,
  SUBSIDIARIES_PRODUCTS_PURCHASESTABLE
}
