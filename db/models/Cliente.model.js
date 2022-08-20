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
      foreignKey: 'id_cliente'
    })
    this.hasMany(models.Pedidos, { foreignKey: 'id_cliente' })
    this.hasMany(models.Favoritos, {
      foreignKey: 'id_cliente'
    })
    this.hasMany(models.Reviews, {
      foreignKey: 'id_cliente'
    })
    this.belongsTo(models.Usuarios, {
      foreignKey: 'id_usuario'
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
