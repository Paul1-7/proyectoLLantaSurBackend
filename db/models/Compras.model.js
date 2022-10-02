const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PROVIDER_TABLE } = require('./Proveedores.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const PURCHASE_TABLE = 'Compras'

const PurchaseSchema = {
  idCompra: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_compra',
    validate: {
      isUUID: 4
    }
  },
  codCompra: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cod_compra',
    validate: {
      isNumeric: msg.isNumeric
    }
  },
  totalCompra: {
    type: DataTypes.FLOAT,
    field: 'total_compra',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  fechaCompra: {
    type: DataTypes.DATE,
    field: 'fecha_compra',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  idProv: {
    type: DataTypes.STRING,
    field: 'id_prov',
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
    this.belongsTo(models.Proveedores, { foreignKey: 'idProv' })
    this.belongsTo(models.Usuarios, { foreignKey: 'idEmp' })
    this.hasMany(models.Detalle_Compras, {
      foreignKey: 'id_compra'
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
