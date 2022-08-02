const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PROVIDER_TABLE } = require('./Proveedores.model.js')
const { EMPLOYEES_TABLE } = require('./Empleados.model.js')

const PURCHASE_TABLE = 'Compras'

const PurchaseSchema = {
  idCompra: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_compra',
    validate: {
      isInt: true
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
    type: DataTypes.INTEGER,
    field: 'id_prov',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric
    },
    references: {
      model: PROVIDER_TABLE,
      key: 'id_prov'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
  }
}

class Purchase extends Model {
  static associate(models) {
    this.belongsTo(models.Proveedores, { foreignKey: 'id_prov' })
    this.belongsTo(models.Empleados, { foreignKey: 'id_emp' })
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
