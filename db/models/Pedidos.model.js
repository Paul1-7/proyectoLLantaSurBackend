const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { SELLS_TABLE } = require('./Ventas.model.js')

const ORDERS_TABLE = 'Pedidos'

const OrdersSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    validate: {
      isUUID: 4
    },
    references: {
      model: SELLS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  estado: {
    type: DataTypes.INTEGER,
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
