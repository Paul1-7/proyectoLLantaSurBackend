const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const BUSINESS_DATA_TABLE = 'Datos_Negocio'

const BusinessDataSchema = {
  idNeg: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_neg',
    validate: {
      isUUID: 4
    }
  },
  numDocNeg: {
    type: DataTypes.STRING,
    field: 'num_doc_neg',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  nombreNeg: {
    type: DataTypes.STRING,
    field: 'nombre_neg',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  actividadEcoNeg: {
    type: DataTypes.STRING,
    field: 'actividad_eco_neg',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  leyendaNeg: {
    type: DataTypes.STRING,
    field: 'leyenda_neg',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  cantMinProd: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cant_min_prod',
    validate: {
      isInt: true,
      notNull: msg.notNull
    }
  },
  logotipoNeg: {
    type: DataTypes.STRING,
    field: 'logotipo_neg',
    allowNull: false
  },
  emailNeg: {
    type: DataTypes.STRING,
    field: 'email_neg',
    allowNull: true,
    unique: true,
    validate: {
      isEmail: msg.isEmail
    }
  }
}

class BusinessData extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: BUSINESS_DATA_TABLE,
      modelName: BUSINESS_DATA_TABLE,
      timestamps: false
    }
  }
}

module.exports = { BusinessData, BusinessDataSchema, BUSINESS_DATA_TABLE }
