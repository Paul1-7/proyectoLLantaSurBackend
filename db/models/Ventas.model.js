const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { EMPLOYEES_TABLE } = require('./Empleados.model.js')
const { CUSTOMER_TABLE } = require('./Cliente.model.js')
const { ORDERS_TABLE } = require('./Pedidos.model.js')

const SELLS_TABLE = 'Ventas'

const SellsSchema = {
  idVenta: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_venta',
    validate: {
      isInt: true
    }
  },
  totalVenta: {
    type: DataTypes.FLOAT,
    field: 'total_venta',
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
  tipoVenta: {
    type: DataTypes.INTEGER,
    field: 'tipo_venta',
    allowNull: false,
    defaultValue: 0,
    validate: {
      is: msg.isState
    }
  },
  idEmp: {
    type: DataTypes.INTEGER,
    field: 'id_emp',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric
    },
    references: {
      model: EMPLOYEES_TABLE,
      key: 'id_emp'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
  },
  idPedido: {
    type: DataTypes.INTEGER,
    field: 'id_pedido',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric
    },
    references: {
      model: ORDERS_TABLE,
      key: 'id_pedido'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Sells extends Model {
  static associate(models) {
    this.belongsTo(models.Clientes, { foreignKey: 'id_cliente' })
    this.belongsTo(models.Empleados, { foreignKey: 'id_emp' })

    this.belongsTo(models.Pedidos, { foreignKey: 'id_pedido' })
    this.hasMany(models.Detalle_Ventas, {
      foreignKey: 'id_venta'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SELLS_TABLE,
      modelName: SELLS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Sells, SellsSchema, SELLS_TABLE }
