const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const { SELLS_TABLE } = require('./Ventas.model.js')
const SELLS_DETAIL_TABLE = 'Detalle_Ventas'

const SellsDetailSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    comment: 'identificador del registro',

    validate: {
      isUUID: 4
    }
  },
  idVenta: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador de la venta',

    field: 'id_venta',
    references: {
      model: SELLS_TABLE,
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
  precioUni: {
    type: DataTypes.FLOAT,
    field: 'precio_uni',
    comment: 'precio unitario del producto',

    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  }
}

class SellsDetail extends Model {
  static associate(models) {
    this.belongsTo(models.Ventas, {
      foreignKey: 'idVenta'
    })
    this.belongsTo(models.Productos, {
      as: 'productos',
      foreignKey: 'idProd'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SELLS_DETAIL_TABLE,
      modelName: SELLS_DETAIL_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  SellsDetail,
  SellsDetailSchema,
  SELLS_DETAIL_TABLE
}
