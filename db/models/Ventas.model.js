const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { SUBSIDIARIES_TABLE } = require('./Sucursales.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const SELLS_TABLE = 'Ventas'

const SellsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador del registro',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  codVenta: {
    allowNull: false,
    comment: 'codigo de la venta',

    type: DataTypes.INTEGER,
    field: 'cod_venta',
    validate: {
      isNumeric: msg.isNumeric
    }
  },
  codReferencia: {
    allowNull: false,
    comment: 'codigo de referencia de la venta',
    type: DataTypes.STRING,
    field: 'cod_referencia'
  },
  fecha: {
    comment: 'fecha de la venta',

    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  total: {
    comment: 'total de la venta realizada',
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: msg.isFloat
    }
  },
  idCliente: {
    comment: 'identificador del cliente',
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
    comment: 'identificador del vendedor',

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
  },
  idSuc: {
    type: DataTypes.STRING,
    comment: 'identificador de la sucursal',

    field: 'id_suc',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: SUBSIDIARIES_TABLE,
      key: 'id'
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
    this.hasMany(models.Productos_Defectuosos, {
      foreignKey: 'idVenta',
      as: 'productosDefectuosos'
    })
    this.belongsTo(models.Sucursales, {
      foreignKey: 'idSuc',
      as: 'sucursal'
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
    this.hasOne(models.Pedidos, { foreignKey: 'id', as: 'pedido' })
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
