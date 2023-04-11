const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PROVIDER_TABLE } = require('./Proveedores.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const PURCHASE_TABLE = 'Compras'

const PurchaseSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador de la compra',
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  codCompra: {
    allowNull: false,
    comment: 'codigo de la compra',
    type: DataTypes.STRING,
    field: 'cod_compra',
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  codReferencia: {
    allowNull: false,
    comment: 'codigo de referencia de la compra',
    type: DataTypes.STRING,
    field: 'cod_referencia'
  },
  total: {
    type: DataTypes.FLOAT,
    comment: 'precio total de la compra',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  fecha: {
    type: DataTypes.DATE,
    comment: 'fecha de la compra',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  idProv: {
    type: DataTypes.STRING,
    field: 'id_prov',
    comment: 'identicador del proveedor',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: PROVIDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idEmp: {
    type: DataTypes.STRING,
    comment: 'identificador del usuario con el rol de empleado',
    field: 'id_emp',
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

class Purchase extends Model {
  static associate(models) {
    this.belongsTo(models.Proveedores, {
      foreignKey: 'idProv',
      as: 'proveedor'
    })
    this.belongsTo(models.Usuarios, { foreignKey: 'idEmp', as: 'usuario' })
    this.hasMany(models.DetalleCompras, {
      foreignKey: 'idCompra',
      as: 'detalle'
    })
    this.hasMany(models.SucursalesProductosCompras, {
      foreignKey: 'idCompra',
      as: 'sucursalesProductos'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PURCHASE_TABLE,
      modelName: PURCHASE_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Purchase, PurchaseSchema, PURCHASE_TABLE }
