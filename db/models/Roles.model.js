const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const ROL_TABLE = 'Roles'

const RolSchema = {
  idRol: {
    allowNull: false,
    primaryKey: true,
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
    field: 'nombre_rol',
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estadoRol: {
    type: DataTypes.INTEGER,
    field: 'estado_rol',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Rol extends Model {
  static associate(models) {
    // this.hasMany(models.Roles_Empleados, { foreignKey: 'id_rol' })
    // this.belongsTo(models.Empleados, {
    //   as: 'empleados', // this is the name of the attribute in the json response
    //   foreignKey: 'id_emp'
    // })
  }

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
