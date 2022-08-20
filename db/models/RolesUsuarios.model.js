const { Model, DataTypes } = require('sequelize')
const { EMPLOYEES_TABLE } = require('./Empleados.model.js')
const { ROL_TABLE } = require('./Roles.model.js')

const ROL_USERS_TABLE = 'Roles_Usuarios'

const RolUsersSchema = {
  idRolEmp: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_rol_emp',
    validate: {
      isUUID: 4
    }
  },
  idEmp: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_emp',
    references: {
      model: EMPLOYEES_TABLE,
      key: 'id_emp'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idRol: {
    allowNull: false,
    type: DataTypes.STRING,
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
