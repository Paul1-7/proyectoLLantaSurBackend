const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const BUSINESS_DATA_TABLE = 'Datos_Negocio'

const BusinessDataSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  numDoc: {
    type: DataTypes.STRING,
    field: 'num_doc',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  actividadEco: {
    type: DataTypes.STRING,
    field: 'actividad_eco',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  leyenda: {
    type: DataTypes.STRING,
    field: 'leyenda',
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
  email: {
    type: DataTypes.STRING,
    field: 'email',
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
