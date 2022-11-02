const { Model, DataTypes } = require('sequelize')
const { PRODUCTS_TABLE } = require('./Productos.model')
const { USER_TABLE } = require('./Usuarios.model')

const FAVORITES_TABLE = 'Favoritos'

const FavoritesSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    comment: 'identificador del registro',

    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  idCliente: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'identificador del cliente',

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

class Favorites extends Model {
  static associate(models) {
    this.belongsTo(models.Usuarios, { foreignKey: 'idCliente' })
    this.belongsTo(models.Productos, { foreignKey: 'idProd' })
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
