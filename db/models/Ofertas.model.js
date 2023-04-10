const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const OFFERS_TABLE = 'Ofertas'

const OffersSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador de la oferta',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  nombre: {
    type: DataTypes.INTEGER,
    comment: 'el nombre para la oferta',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  precio: {
    type: DataTypes.FLOAT,
    comment: 'precio de los productos para la oferta',
    allowNull: false,
    validate: {
      isFloat: msg.isFloat,
      notNull: msg.notNull
    }
  },
  fechaInicio: {
    type: DataTypes.DATE,
    comment: 'fecha de inicio de la oferta',
    field: 'fecha_inicio',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  fechaFin: {
    type: DataTypes.DATE,
    comment: 'fecha de fin de la oferta',
    field: 'fecha_fin',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    comment: 'estado de la oferta',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Offers extends Model {
  static associate(models) {
    this.hasMany(models.OfertasProductos, { foreignKey: 'idOferta' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OFFERS_TABLE,
      modelName: OFFERS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  Offers,
  OffersSchema,
  OFFERS_TABLE
}
