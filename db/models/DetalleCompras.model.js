const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PURCHASE_TABLE } = require('./Compras.model.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')

const PURCHASE_DETAIL_TABLE = 'Detalle_Compras'

const PurchaseDetailSchema = {
  idCompra: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_compra',
    references: {
      model: PURCHASE_TABLE,
      key: 'id_compra'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idProd: {
    primaryKey: true,
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
  },
  cantidadDetCompra: {
    type: DataTypes.INTEGER,
    field: 'cantidad_det_compra',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  precioUniCompra: {
    type: DataTypes.FLOAT,
    field: 'precio_uni_compra',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  subtotalDetCompra: {
    type: DataTypes.FLOAT,
    field: 'subtotal_det_compra',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  }
}

class PurchaseDetail extends Model {
  static associate(models) {
    this.belongsTo(models.Compras, {
      foreignKey: 'id_compra'
    })
    this.belongsTo(models.Productos, {
      foreignKey: 'idProd'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PURCHASE_DETAIL_TABLE,
      modelName: PURCHASE_DETAIL_TABLE,
      timestamps: false
    }
  }
}

module.exports = { PurchaseDetail, PurchaseDetailSchema, PURCHASE_DETAIL_TABLE }
