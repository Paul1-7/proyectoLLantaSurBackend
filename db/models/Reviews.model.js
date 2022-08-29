const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const REVIEWS_TABLE = 'Reviews'

const ReviewsSchema = {
  idCliente: {
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
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
      key: 'id_prod'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  tituloReview: {
    type: DataTypes.STRING,
    field: 'titulo_review',
    validate: {
      is: msg.isAlphanumeric
    }
  },
  descReview: {
    type: DataTypes.STRING,
    field: 'desc_review',
    validate: {
      is: msg.isAlphanumeric
    }
  },
  fechaReview: {
    type: DataTypes.DATE,
    field: 'fecha_review',
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  calificacionReview: {
    type: DataTypes.INTEGER,
    field: 'calificacion_review',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  estadoReview: {
    type: DataTypes.INTEGER,
    field: 'estado_review',
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
      foreignKey: 'id_prod'
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
