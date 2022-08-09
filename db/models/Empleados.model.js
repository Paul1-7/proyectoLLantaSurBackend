const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { SUBSIDIARIES_TABLE } = require('./Sucursales.model.js')

const EMPLOYEES_TABLE = 'Empleados'

const EmployeesSchema = {
  idEmp: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_emp',
    validate: {
      isInt: true
    }
  },
  nombreEmp: {
    type: DataTypes.STRING,
    field: 'nombre_emp',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  apellidoEmp: {
    type: DataTypes.STRING,
    field: 'apellido_emp',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  fotoEmp: {
    type: DataTypes.STRING,
    field: 'foto_emp',
    allowNull: false
  },
  ciEmp: {
    type: DataTypes.STRING,
    field: 'ci_emp',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  passwordEmp: {
    type: DataTypes.STRING,
    field: 'password_emp',
    allowNull: false,
    validate: {
      notNull: msg.notNull,
      is: msg.password
    }
  },
  estadoEmp: {
    type: DataTypes.INTEGER,
    field: 'estado_emp',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  },
  celularEmp: {
    type: DataTypes.INTEGER,
    field: 'celular_emp',
    allowNull: true,
    validate: {
      is: msg.isPhone
    }
  },
  usuarioEmp: {
    type: DataTypes.STRING,
    field: 'usuario_emp',
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  emailEmp: {
    type: DataTypes.STRING,
    field: 'email_emp',
    allowNull: false,
    unique: true,
    validate: {
      isEmail: msg.isEmail,
      notNull: msg.notNull
    }
  },
  idSuc: {
    type: DataTypes.INTEGER,
    field: 'id_suc',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric
    },
    references: {
      model: SUBSIDIARIES_TABLE,
      key: 'id_suc'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Employees extends Model {
  static associate(models) {
    this.hasMany(models.Compras, {
      foreignKey: 'id_emp'
    })

    this.hasMany(models.Ventas, {
      foreignKey: 'id_emp'
    })

    this.belongsTo(models.Sucursales, {
      foreignKey: 'id_suc'
    })

    this.belongsToMany(models.Roles, {
      through: models.Roles_Empleados,
      as: 'roles',
      foreignKey: 'idEmp',
      otherKey: 'idRol'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEES_TABLE,
      modelName: EMPLOYEES_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  Employees,
  EmployeesSchema,
  EMPLOYEES_TABLE
}
