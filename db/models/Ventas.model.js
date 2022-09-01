const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
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
  metodoPago: {
    type: DataTypes.INTEGER,
    field: 'metodo_pago',
    allowNull: false,
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
    allowNull: true,
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

class Sells extends Model {
  static associate(models) {
    this.hasMany(models.Detalle_Ventas, {
      foreignKey: 'idVenta',
      as: 'detalle'
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
    this.hasOne(models.Pedidos, { foreignKey: 'idPedido', as: 'pedido' })
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
