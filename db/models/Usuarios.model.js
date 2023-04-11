const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { SUBSIDIARIES_TABLE } = require('./Sucursales.model.js')

const USER_TABLE = 'Usuarios'

const UserSchema = {
  idUsuario: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador del registro',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_usuario',
    validate: {
      isUUID: 4
    }
  },
  nombre: {
    type: DataTypes.STRING,
    comment: 'nombre del usuario',

    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  apellido: {
    type: DataTypes.STRING,
    comment: 'apellido del usuario',

    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  direccion: {
    type: DataTypes.STRING,
    comment: 'direccion del usuario',

    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  ciNit: {
    type: DataTypes.STRING,
    comment: 'carnet de identidad o NIT del usuario',

    field: 'ci_nit',
    unique: true,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  celular: {
    type: DataTypes.STRING,
    comment: 'celular del usuario',

    field: 'celular',
    allowNull: true,
    unique: true,
    validate: {
      is: msg.isPhone
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    comment: 'estado del usuario',

    defaultValue: 1
  },
  password: {
    type: DataTypes.TEXT,
    comment: 'password para ingresar al sistema',

    allowNull: false,
    validate: {
      notNull: msg.notNull
    }
  },
  email: {
    type: DataTypes.STRING,
    comment: 'email del usuario',

    allowNull: true,
    unique: true,
    validate: {
      is: msg.isEmail
    }
  },

  usuario: {
    type: DataTypes.STRING,
    comment: 'usuario para ingresar al sistema',

    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },

  tokenRecovery: {
    comment: 'token para recuperar si la password es olvidada',

    type: DataTypes.STRING,
    allowNull: true
  },
  smsValidacion: {
    type: DataTypes.STRING,
    comment: 'token para validar la cuenta',

    field: 'sms_validacion',
    allowNull: true
  },
  idSuc: {
    type: DataTypes.STRING,
    comment: 'identificador de la sucursal',

    field: 'id_suc',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: SUBSIDIARIES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class User extends Model {
  static associate(models) {
    this.belongsToMany(models.Roles, {
      through: models.RolesUsuarios,
      as: 'roles',
      foreignKey: 'idUsuario',
      otherKey: 'idRol'
    })
    this.hasMany(models.Ventas, {
      foreignKey: 'idVendedor',
      sourceKey: 'idUsuario',
      as: 'ventasVendedor'
    })
    this.hasMany(models.Ventas, {
      foreignKey: 'idCliente',
      sourceKey: 'idUsuario',
      as: 'ventasCliente'
    })
    this.hasMany(models.Compras, {
      foreignKey: 'idEmp',
      as: 'compras'
    })
    this.hasMany(models.MovimientosSucursales, {
      foreignKey: 'idUsuario'
    })
    this.hasMany(models.Reviews, {
      foreignKey: 'idCliente',
      as: 'reviews'
    })
    this.hasMany(models.Favoritos, {
      foreignKey: 'idCliente',
      as: 'favoritos'
    })
    this.belongsTo(models.Sucursales, {
      foreignKey: 'idSuc',
      as: 'sucursal'
    })
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
