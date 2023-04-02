const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')

const SLIDERS_IMAGES_TABLE = 'Sliders_Images'

const SlidersImagesSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador del slider',
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  urlImg: {
    type: DataTypes.STRING,
    unique: true,
    field: 'url_img',
    comment: 'url de la img',
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
  },
  idProd: {
    type: DataTypes.STRING,
    comment: 'identificador del producto',
    field: 'id_prod',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: PRODUCTS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class SlidersImages extends Model {
  static associate(models) {
    this.belongsTo(models.Productos, { foreignKey: 'idProd', as: 'producto' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SLIDERS_IMAGES_TABLE,
      modelName: SLIDERS_IMAGES_TABLE,
      timestamps: false
    }
  }
}

module.exports = { SlidersImages, SlidersImagesSchema, SLIDERS_IMAGES_TABLE }
