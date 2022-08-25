const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { ORDERS_TABLE } = require('./Pedidos.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const SELLS_TABLE = 'Ventas'

const SellsSchema = {
  idVenta: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_venta',
    validate: {
      isUUID: 4
    }
  },
  codVenta: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cod_venta',
    validate: {
      isNumeric: msg.isNumeric
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
  },
  idVendedor: {
    type: DataTypes.STRING,
    field: 'id_vendedor',
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
  },
  idPedido: {
    type: DataTypes.STRING,
    field: 'id_pedido',
    allowNull: false,
    validate: {
      isUUID: 4
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
    this.belongsTo(models.Pedidos, { foreignKey: 'idPedido' })
    this.hasMany(models.Detalle_Ventas, {
      foreignKey: 'id_venta'
    })

    this.belongsTo(models.Usuarios, {
      foreignKey: 'idVendedor',
      as: 'vendedor',
      targetKey: 'idUsuario'
    })
    this.belongsTo(models.Usuarios, {
      foreignKey: 'idCliente',
      as: 'cliente',
      targetKey: 'idUsuario'
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
