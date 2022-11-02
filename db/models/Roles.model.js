const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const ROL_TABLE = 'Roles'

const RolSchema = {
  idRol: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador del registro',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_rol',
    validate: {
      isUUID: 4
    }
  },
  nombreRol: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'nombre del rol',

    field: 'nombre_rol',
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estadoRol: {
    type: DataTypes.INTEGER,
    field: 'estado_rol',
    comment: 'estado del rol',

    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Rol extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROL_TABLE,
      modelName: ROL_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Rol, RolSchema, ROL_TABLE }
