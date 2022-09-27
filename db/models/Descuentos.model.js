const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const DISCOUNTS_TABLE = 'Descuentos'

const DiscountsSchema = {
  idDesc: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_desc',
    validate: {
      isUUID: 4
    }
  },
  cantMaxDesc: {
    type: DataTypes.INTEGER,
    field: 'cant_max_desc',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  fechaInicio: {
    type: DataTypes.DATE,
    field: 'fecha_inicio',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  fechaFin: {
    type: DataTypes.DATE,
    field: 'fecha_fin',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
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
