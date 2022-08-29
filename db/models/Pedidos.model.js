const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { SELLS_TABLE } = require('./Ventas.model.js')

const ORDERS_TABLE = 'Pedidos'

const OrdersSchema = {
  idPedido: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'id_pedido',
    validate: {
      isUUID: 4
    },
    references: {
      model: SELLS_TABLE,
      key: 'id_venta'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  estadoPedido: {
    type: DataTypes.INTEGER,
    field: 'estado_pedido',
    allowNull: false,
    defaultValue: 0,
    validate: {
      is: msg.isState
    }
  }
}

class Orders extends Model {
  static associate(models) {
    this.belongsTo(models.Ventas, { foreignKey: 'idPedido', as: 'venta' })
    // this.hasMany(models.Detalle_Pedidos, {
    //   foreignKey: 'id_pedido',
    //   as: 'detalle'
    // })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: ORDERS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Orders, OrdersSchema, ORDERS_TABLE }
