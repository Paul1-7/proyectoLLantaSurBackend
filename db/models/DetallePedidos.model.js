const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { ORDERS_TABLE } = require('./Pedidos.model.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const ORDERS_DETAIL_TABLE = 'Detalle_Pedidos'

const OrdersDetailSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  idPedido: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_pedido',
    references: {
      model: ORDERS_TABLE,
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
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  }
}

class OrdersDetail extends Model {
  static associate(models) {
    // this.belongsTo(models.Productos, {
    //   foreignKey: 'idProd'
    // })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_DETAIL_TABLE,
      modelName: ORDERS_DETAIL_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  OrdersDetail,
  OrdersDetailSchema,
  ORDERS_DETAIL_TABLE
}
