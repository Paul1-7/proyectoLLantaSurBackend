const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')

const REVIEWS_TABLE = 'Reviews'

const ReviewsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador del registro',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  idCliente: {
    type: DataTypes.STRING,
    field: 'id_cliente',
    comment: 'identificador del cliente',

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
    allowNull: false,
    comment: 'identificador del producto',

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
    comment: 'titulo de la review',

    validate: {
      is: msg.isAlphanumeric
    }
  },
  descripcion: {
    type: DataTypes.STRING,
    comment: 'descripcion de la review',

    validate: {
      is: msg.isAlphanumeric
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'fecha que se realizo la review',

    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  calificacion: {
    type: DataTypes.INTEGER,
    comment: 'calificacion que el usuario asigna al producto',

    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    comment: 'estado de la review',

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
