const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const PROVIDER_TABLE = 'Proveedores'

const ProviderSchema = {
  idProv: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_prov',
    validate: {
      isUUID: 4
    }
  },
  nombreProv: {
    type: DataTypes.STRING,
    field: 'nombre_prov',
    allowNull: false,
    unique: true,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  telProv: {
    type: DataTypes.STRING,
    field: 'tel_prov',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  nombreEncProv: {
    type: DataTypes.STRING,
    field: 'nombre_enc_prov',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  apEncProv: {
    type: DataTypes.STRING,
    field: 'ap_enc_prov',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estadoProv: {
    type: DataTypes.INTEGER,
    field: 'estado_prov',
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
      foreignKey: 'id_prov'
    })
    this.hasMany(models.Productos, { foreignKey: 'id_prov' })
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
