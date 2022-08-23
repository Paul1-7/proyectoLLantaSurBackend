const { Model, DataTypes } = require('sequelize')
const { CUSTOMER_TABLE } = require('./Cliente.model')
const { PRODUCTS_TABLE } = require('./Productos.model')
const { USER_TABLE } = require('./Usuarios.model')

const FAVORITES_TABLE = 'Favoritos'

const FavoritesSchema = {
  idCliente: {
    primaryKey: true,
    allowNull: false,
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
  }
}

class Favorites extends Model {
  static associate(models) {
    this.belongsTo(models.Usuarios, { foreignKey: 'idCliente' })
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
