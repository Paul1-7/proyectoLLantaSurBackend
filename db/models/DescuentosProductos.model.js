const { Model, DataTypes } = require('sequelize')
const { DISCOUNTS_TABLE } = require('./Descuentos.model')
const { PRODUCTS_TABLE } = require('./Productos.model')

const DISCOUNTS_PRODUCTS_TABLE = 'Descuentos_Productos'

const DiscountsProductsSchema = {
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
  idDesc: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador del descuento',

    field: 'id_desc',
    references: {
      model: DISCOUNTS_TABLE,
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
  }
}

class DiscountsProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Descuentos, { foreignKey: 'idDesc' })
    this.belongsTo(models.Productos, { foreignKey: 'idProd' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DISCOUNTS_PRODUCTS_TABLE,
      modelName: DISCOUNTS_PRODUCTS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  DiscountsProducts,
  DiscountsProductsSchema,
  DISCOUNTS_PRODUCTS_TABLE
}
