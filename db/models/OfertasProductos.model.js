const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg')
const { OFFERS_TABLE } = require('./Ofertas.model')
const { PRODUCTS_TABLE } = require('./Productos.model')

const OFFERS_PRODUCTS_TABLE = 'Ofertas_Productos'

const OffersProductsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador de la registro',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  idOferta: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador de la oferta',

    field: 'id_oferta',
    references: {
      model: OFFERS_TABLE,
      key: 'id'
    },
    validate: {
      isUUID: 4
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idProd: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador del producto',
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
  cantidad: {
    type: DataTypes.INTEGER,
    comment: 'cantidad del producto para la oferta',

    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  }
}

class OffersProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Ofertas, { foreignKey: 'idOfertas' })
    this.belongsTo(models.Productos, { foreignKey: 'idProd' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OFFERS_PRODUCTS_TABLE,
      modelName: OFFERS_PRODUCTS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  OffersProducts,
  OffersProductsSchema,
  OFFERS_PRODUCTS_TABLE
}
