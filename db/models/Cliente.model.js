const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const CUSTOMER_TABLE = 'Clientes'

const CustomerSchema = {
  idCliente: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_cliente',
    validate: {
      isUUID: 4
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
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
  celular: {
    type: DataTypes.INTEGER,
    field: 'celular',
    allowNull: true,
    unique: true,
    validate: {
      is: msg.isPhone
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
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

class Customer extends Model {
  static associate(models) {
    this.hasMany(models.Ventas, {
      foreignKey: 'idCliente',
      as: 'ventas'
    })
    this.hasMany(models.Pedidos, {
      foreignKey: 'idCliente',
      as: 'pedidos'
    })
    this.hasMany(models.Favoritos, {
      foreignKey: 'idCliente',
      as: 'favoritos'
    })
    this.hasMany(models.Reviews, {
      foreignKey: 'idCliente',
      as: 'reviews'
    })
    this.belongsTo(models.Usuarios, {
      foreignKey: 'idUsuario',
      as: 'usuario'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: CUSTOMER_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE }
