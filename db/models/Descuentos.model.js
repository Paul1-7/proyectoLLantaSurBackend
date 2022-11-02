const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const DISCOUNTS_TABLE = 'Descuentos'

const DiscountsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador de descuentos',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  cantMax: {
    type: DataTypes.INTEGER,
    comment: 'cantidad maxima del producto para el descuento',

    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  fechaInicio: {
    type: DataTypes.DATE,
    comment: 'fecha de inicio del descuento',

    field: 'fecha_inicio',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  fechaFin: {
    type: DataTypes.DATE,
    comment: 'fecha de fin del descuento',

    field: 'fecha_fin',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    comment: 'estado del descuento',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Discounts extends Model {
  static associate(models) {
    this.hasMany(models.Descuentos_Productos, { foreignKey: 'idDesc' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DISCOUNTS_TABLE,
      modelName: DISCOUNTS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Discounts, DiscountsSchema, DISCOUNTS_TABLE }
