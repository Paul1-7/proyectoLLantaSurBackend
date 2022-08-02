const { Model, DataTypes } = require('sequelize')
const { CUSTOMER_TABLE } = require('./Cliente.model')
const { PRODUCTS_TABLE } = require('./Productos.model')

const FAVORITES_TABLE = 'Favoritos'

const FavoritesSchema = {
  idCliente: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_cliente',
    references: {
      model: CUSTOMER_TABLE,
      key: 'id_cliente'
    },
    validate: {
      isInt: true
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idProd: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_prod',
    references: {
      model: PRODUCTS_TABLE,
      key: 'id_prod'
    },
    validate: {
      isInt: true
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Favorites extends Model {
  static associate(models) {
    this.belongsTo(models.Clientes, { foreignKey: 'id_cliente' })
    this.belongsTo(models.Productos, { foreignKey: 'id_prod' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FAVORITES_TABLE,
      modelName: FAVORITES_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Favorites, FavoritesSchema, FAVORITES_TABLE }
