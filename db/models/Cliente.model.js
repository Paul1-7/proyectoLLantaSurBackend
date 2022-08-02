const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const CUSTOMER_TABLE = 'Clientes'

const CustomerSchema = {
  idCliente: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_cliente',
    validate: {
      isInt: true
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
  ci: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: msg.isAlphanumeric,
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
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  celular: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      is: msg.isPhone
    }
  },
  tokenRecovery: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}

class Customer extends Model {
  static associate(models) {
    this.hasMany(models.Ventas, {
      foreignKey: 'id_cliente'
    })
    this.hasMany(models.Pedidos, { foreignKey: 'id_cliente' })
    this.hasMany(models.Favoritos, {
      foreignKey: 'id_cliente'
    })
    this.hasMany(models.Reviews, {
      foreignKey: 'id_cliente'
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
