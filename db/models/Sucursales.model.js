const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const SUBSIDIARIES_TABLE = 'Sucursales'

const SubsidiariesSchema = {
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
    unique: true,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
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

class Subsidiaries extends Model {
  static associate(models) {
    this.hasMany(models.Usuarios, { foreignKey: 'idSuc' })
    this.belongsToMany(models.Productos, {
      through: models.Sucursales_Productos,
      as: 'productos',
      foreignKey: 'idSuc',
      otherKey: 'idProd'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBSIDIARIES_TABLE,
      modelName: SUBSIDIARIES_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Subsidiaries, SubsidiariesSchema, SUBSIDIARIES_TABLE }
