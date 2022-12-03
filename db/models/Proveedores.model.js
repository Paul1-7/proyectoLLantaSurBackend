const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const PROVIDER_TABLE = 'Proveedores'

const ProviderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    comment: 'identificador del registro',

    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  nombre: {
    type: DataTypes.STRING,
    comment: 'nombre del proveedor',

    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  tel: {
    type: DataTypes.STRING,
    comment: 'telefono o celular del proveedor',

    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  nombreEnc: {
    type: DataTypes.STRING,
    comment: 'nombre del encargado',

    field: 'nombre_enc',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  apEnc: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'apellido del encargado',

    field: 'ap_enc',
    validate: {
      is: msg.isAlphanumeric
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    comment: 'estado del proveedor',

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
