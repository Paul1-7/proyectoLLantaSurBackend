const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const BRANDS_TABLE = 'Marcas'

const BrandsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Brands extends Model {
  static associate(models) {
    this.hasMany(models.Productos, { foreignKey: 'idMarca', as: 'productos' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BRANDS_TABLE,
      modelName: BRANDS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Brands, BrandsSchema, BRANDS_TABLE }
