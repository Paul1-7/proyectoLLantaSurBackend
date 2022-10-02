const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const PROVIDER_TABLE = 'Proveedores'

const ProviderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  nombreEnc: {
    type: DataTypes.STRING,
    field: 'nombre_enc',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  apEnc: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'ap_enc',
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Provider extends Model {
  static associate(models) {
    this.hasMany(models.Compras, {
      as: 'compras',
      foreignKey: 'idProv'
    })
    this.hasMany(models.Productos, { foreignKey: 'idProv', as: 'productos' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROVIDER_TABLE,
      modelName: PROVIDER_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Provider, ProviderSchema, PROVIDER_TABLE }
