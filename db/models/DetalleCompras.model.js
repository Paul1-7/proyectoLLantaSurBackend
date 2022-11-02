const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PURCHASE_TABLE } = require('./Compras.model.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')

const PURCHASE_DETAIL_TABLE = 'Detalle_Compras'

const PurchaseDetailSchema = {
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
  },
  cantidad: {
    type: DataTypes.INTEGER,
    comment: 'cantidad del producto',

    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  precio: {
    type: DataTypes.FLOAT,
    comment: 'precio unitario del producto',

    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  subtotal: {
    type: DataTypes.FLOAT,
    comment: 'subtotal del producto',

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
      foreignKey: 'idCompra'
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
