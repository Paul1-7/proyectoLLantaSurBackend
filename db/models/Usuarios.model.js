const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const USER_TABLE = 'Usuarios'

const UserSchema = {
  idUsuario: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    field: 'id_usuario',
    validate: {
      isInt: true
    }
  },
  ciNit: {
    type: DataTypes.STRING,
    field: 'ci_nit',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: msg.notNull,
      is: msg.password
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: msg.isEmail
    }
  },

  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  celular: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
    validate: {
      is: msg.isPhone
    }
  },
  tokenRecovery: {
    type: DataTypes.STRING,
    allowNull: true
  },
  smsValidacion: {
    type: DataTypes.STRING,
    field: 'sms_validacion',
    allowNull: true
  }
}

class User extends Model {
  static associate(models) {
    // this.hasMany(models.Roles, {
    //   foreignKey: 'id_usuario'
    // })
    this.belongsToMany(models.Roles, {
      through: models.Roles_Usuarios,
      as: 'roles',
      foreignKey: 'idUsuario',
      otherKey: 'idRol'
    })
    this.hasOne(models.Empleados, { foreignKey: 'id_usuario' })
    this.hasOne(models.Clientes, { foreignKey: 'id_usuario' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: USER_TABLE,
      timestamps: false
    }
  }
}

module.exports = { User, UserSchema, USER_TABLE }
