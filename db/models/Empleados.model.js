const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { SUBSIDIARIES_TABLE } = require('./Sucursales.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const EMPLOYEES_TABLE = 'Empleados'

const EmployeesSchema = {
  idEmp: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_emp',
    validate: {
      isUUID: 4
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

  estadoEmp: {
    type: DataTypes.INTEGER,
    field: 'estado_emp',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  },

  idSuc: {
    type: DataTypes.STRING,
    field: 'id_suc',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: SUBSIDIARIES_TABLE,
      key: 'id_suc'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idUsuario: {
    type: DataTypes.STRING,
    field: 'id_usuario',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: USER_TABLE,
      key: 'id_usuario'
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
    this.belongsTo(models.Usuarios, {
      foreignKey: 'id_usuario'
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
