const { Model, DataTypes } = require('sequelize')
const { EMPLOYEES_TABLE } = require('./Empleados.model.js')
const { ROL_TABLE } = require('./Roles.model.js')

const ROL_EMPLOYEES_TABLE = 'Roles_Empleados'

const RolEmployeesSchema = {
  idEmp: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_emp',
    references: {
      model: EMPLOYEES_TABLE,
      key: 'id_emp'
    },
    validate: {
      isInt: true
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idRol: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_rol',
    references: {
      model: ROL_TABLE,
      key: 'id_rol'
    },
    validate: {
      isInt: true
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class RolEmployees extends Model {
  static associate(models) {
    this.belongsTo(models.Empleados, { foreignKey: 'id_emp' })
    this.belongsTo(models.Roles, { foreignKey: 'id_rol' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROL_EMPLOYEES_TABLE,
      modelName: ROL_EMPLOYEES_TABLE,
      timestamps: false
    }
  }
}

module.exports = { RolEmployees, RolEmployeesSchema, ROL_EMPLOYEES_TABLE }
