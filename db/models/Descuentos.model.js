const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const DISCOUNTS_TABLE = 'Descuentos'

const DiscountsSchema = {
  idDesc: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_desc',
    validate: {
      isInt: true
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
    this.hasMany(models.Descuentos_Productos, { foreignKey: 'id_desc' })
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
