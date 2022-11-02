const { Model, DataTypes } = require('sequelize')
const { ROL_TABLE } = require('./Roles.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const ROL_USERS_TABLE = 'Roles_Usuarios'

const RolUsersSchema = {
  idRolUsuario: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador del registro',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_rol_usuario',
    validate: {
      isUUID: 4
    }
  },
  idUsuario: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador del usuario',

    field: 'id_usuario',
    references: {
      model: USER_TABLE,
      key: 'id_usuario'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  idRol: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador del rol',

    field: 'id_rol',
    references: {
      model: ROL_TABLE,
      key: 'id_rol'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class RolUsers extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROL_USERS_TABLE,
      modelName: ROL_USERS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { RolUsers, RolUsersSchema, ROL_USERS_TABLE }
