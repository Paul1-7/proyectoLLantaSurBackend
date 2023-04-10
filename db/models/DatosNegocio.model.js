const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const BUSINESS_DATA_TABLE = 'DatosNegocio'

const BusinessDataSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    comment: 'identificador de los datos del negocio',
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  numDoc: {
    type: DataTypes.STRING,
    field: 'num_doc',
    comment: 'numero de documento del negocio (NIT)',

    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  cuf: {
    type: DataTypes.STRING,
    comment: 'codigo unico de factura',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  nombre: {
    type: DataTypes.STRING,
    comment: 'nombre del negocio',

    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  actividadEco: {
    type: DataTypes.STRING,
    field: 'actividad_eco',
    comment: 'actividad economica del negocio',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  leyenda: {
    type: DataTypes.STRING,
    field: 'leyenda',
    comment: 'leyenda que se muestra en las facturas',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  email: {
    type: DataTypes.STRING,
    comment: 'email del negocio',
    allowNull: true,
    unique: true,
    validate: {
      isEmail: msg.isEmail
    }
  },
  tel: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'telefono de la casa matriz',
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  direccion: {
    type: DataTypes.STRING,
    comment: 'dirección de la casa matriz',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  ciudad: {
    type: DataTypes.STRING,
    comment: 'ciudad de la casa matriz',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
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
