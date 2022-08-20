const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const BRANDS_TABLE = 'Marcas'

const BrandsSchema = {
  idMarca: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_marca',
    validate: {
      isUUID: 4
    }
  },
  nombreMarca: {
    type: DataTypes.STRING,
    field: 'nombre_marca',
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estadoMarca: {
    type: DataTypes.INTEGER,
    field: 'estado_marca',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Brands extends Model {
  static associate(models) {
    this.hasMany(models.Productos, { foreignKey: 'id_marca' })
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
