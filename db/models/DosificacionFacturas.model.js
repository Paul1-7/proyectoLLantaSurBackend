const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const INVOICE_BATCHING_TABLE = 'Dosificacion_Facturas'

const InvoiceBatchingSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  numAutorizacion: {
    type: DataTypes.STRING,
    field: 'num_autorizacion',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  numFactInicial: {
    type: DataTypes.INTEGER,
    field: 'num_fact_inicial',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  llaveDosificacion: {
    type: DataTypes.STRING,
    field: 'llave_dosificacion',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  fechaLimEmision: {
    type: DataTypes.STRING,
    field: 'fecha_lim_emision',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  }
}

class InvoiceBatching extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVOICE_BATCHING_TABLE,
      modelName: INVOICE_BATCHING_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  InvoiceBatching,
  InvoiceBatchingSchema,
  INVOICE_BATCHING_TABLE
}
