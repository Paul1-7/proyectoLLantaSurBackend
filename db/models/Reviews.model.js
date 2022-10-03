const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const REVIEWS_TABLE = 'Reviews'

const ReviewsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  idCliente: {
    type: DataTypes.STRING,
    field: 'id_cliente',
    references: {
      model: USER_TABLE,
      key: 'id_usuario'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idProd: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_prod',
    references: {
      model: PRODUCTS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  titulo: {
    type: DataTypes.STRING,
    validate: {
      is: msg.isAlphanumeric
    }
  },
  descripcion: {
    type: DataTypes.STRING,
    validate: {
      is: msg.isAlphanumeric
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
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

class Reviews extends Model {
  static associate(models) {
    this.belongsTo(models.Usuarios, {
      foreignKey: 'idCliente',
      as: 'usuarios'
    })
    this.belongsTo(models.Productos, {
      foreignKey: 'idProd'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REVIEWS_TABLE,
      modelName: REVIEWS_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Reviews, ReviewsSchema, REVIEWS_TABLE }
