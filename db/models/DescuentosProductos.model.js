const { Model, DataTypes } = require('sequelize')
const { DISCOUNTS_TABLE } = require('./Descuentos.model')
const { PRODUCTS_TABLE } = require('./Productos.model')

const DISCOUNTS_PRODUCTS_TABLE = 'Descuentos_Productos'

const DiscountsProductsSchema = {
  idDesc: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_desc',
    references: {
      model: DISCOUNTS_TABLE,
      key: 'id_desc'
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
  }
}

class DiscountsProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Descuentos, { foreignKey: 'id_desc' })
    this.belongsTo(models.Productos, { foreignKey: 'id_prod' })
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
