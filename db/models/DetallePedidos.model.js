const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { ORDERS_TABLE } = require('./Pedidos.model.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const ORDERS_DETAIL_TABLE = 'Detalle_Pedidos'

const OrdersDetailSchema = {
  idPedido: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_pedido',
    references: {
      model: ORDERS_TABLE,
      key: 'id_pedido'
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
  cantidadDetPed: {
    type: DataTypes.INTEGER,
    field: 'cantidad_det_ped',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  precioUniPed: {
    type: DataTypes.FLOAT,
    field: 'precio_uni_ped',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  subtotalDetPed: {
    type: DataTypes.FLOAT,
    field: 'subtotal_det_ped',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  }
}

class OrdersDetail extends Model {
  static associate(models) {
    // this.belongsTo(models.Pedidos, {
    //   foreignKey: 'id_pedido'
    // })
    this.belongsTo(models.Productos, {
      foreignKey: 'idProd'
    })
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
