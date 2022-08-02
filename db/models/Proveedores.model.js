const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const PROVIDER_TABLE = 'Proveedores'

const ProviderSchema = {
  idProv: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_prov',
    validate: {
      isInt: true
    }
  },
  nombreProv: {
    type: DataTypes.STRING,
    field: 'nombre_prov',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  tipoDocProv: {
    type: DataTypes.INTEGER,
    field: 'tipo_doc_prov',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  numDocProv: {
    type: DataTypes.STRING,
    field: 'num_doc_prov',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  direccionProv: {
    type: DataTypes.STRING,
    field: 'direcccion_prov',
    allowNull: false,
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
