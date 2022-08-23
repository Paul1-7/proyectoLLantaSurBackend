const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const SUBSIDIARIES_TABLE = 'Sucursales'

const SubsidiariesSchema = {
  idSuc: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_suc',
    validate: {
      isUUID: 4
    }
  },
  nombreSuc: {
    type: DataTypes.STRING,
    field: 'nombre_suc',
    unique: true,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  direccionSuc: {
    type: DataTypes.STRING,
    field: 'direccion_suc',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  telSuc: {
    type: DataTypes.STRING,
    field: 'tel_suc',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estadoSuc: {
    type: DataTypes.INTEGER,
    field: 'estado_suc',
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
      foreignKey: 'id_suc',
      otherKey: 'id_prod'
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
