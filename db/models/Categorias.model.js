const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const CATEGORIES_TABLE = 'Categorias'

const CategoriesSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador de la categoria',
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  nombre: {
    type: DataTypes.STRING,
    unique: true,
    comment: 'nombre para la categoria',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  descripcion: {
    type: DataTypes.STRING,
    comment: 'descripcion para la categoria',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  url: {
    type: DataTypes.STRING,
    unique: true,
    comment: 'url que se mostrara en la tienda',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    comment: 'estado de la categoria',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Categories extends Model {
  static associate(models) {
    this.hasMany(models.Productos, { foreignKey: 'idCat', as: 'productos' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: CATEGORIES_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Categories, CategoriesSchema, CATEGORIES_TABLE }
