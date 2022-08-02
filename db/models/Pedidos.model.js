const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { CUSTOMER_TABLE } = require('./Cliente.model.js')

const ORDERS_TABLE = 'Pedidos'

const OrdersSchema = {
  idPedido: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_pedido',
    validate: {
      isInt: true
    }
  },
  totalPedido: {
    type: DataTypes.FLOAT,
    field: 'total_pedido',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  fechaVenta: {
    type: DataTypes.DATE,
    field: 'fecha_venta',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  estadoPedido: {
    type: DataTypes.INTEGER,
    field: 'estado_pedido',
    allowNull: false,
    defaultValue: 0,
    validate: {
      is: msg.isState
    }
  },

  idCliente: {
    type: DataTypes.INTEGER,
    field: 'id_cliente',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric
    },
    references: {
      model: CUSTOMER_TABLE,
      key: 'id_cliente'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Orders extends Model {
  static associate(models) {
    this.belongsTo(models.Clientes, { foreignKey: 'id_cliente' })
    this.hasOne(models.Ventas, { foreignKey: 'id_pedido' })
    this.hasMany(models.Detalle_Pedidos, {
      foreignKey: 'id_pedido'
    })
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
