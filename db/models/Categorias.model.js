const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const CATEGORIES_TABLE = 'Categorias'

const CategoriesSchema = {
  idCat: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'id_cat',
    validate: {
      isInt: true
    }
  },
  nombreCat: {
    type: DataTypes.STRING,
    field: 'nombre_cat',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  descCat: {
    type: DataTypes.STRING,
    field: 'desc_cat',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estadoCat: {
    type: DataTypes.INTEGER,
    field: 'estado_cat',
    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Categories extends Model {
  static associate(models) {
    this.hasMany(models.Productos, { foreignKey: 'id_cat' })
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
