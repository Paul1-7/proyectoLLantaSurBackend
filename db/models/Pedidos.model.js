const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { CUSTOMER_TABLE } = require('./Cliente.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const ORDERS_TABLE = 'Pedidos'

const OrdersSchema = {
  idPedido: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_pedido',
    validate: {
      isUUID: 4
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
    type: DataTypes.STRING,
    field: 'id_cliente',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: USER_TABLE,
      key: 'id_usuario'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Orders extends Model {
  static associate(models) {
    this.belongsTo(models.Usuarios, { foreignKey: 'idCliente' })
    this.hasOne(models.Ventas, { foreignKey: 'idPedido' })
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
