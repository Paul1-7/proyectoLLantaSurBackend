const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')

const DEFECTIVE_PRODUCTS_TABLE = 'Productos_Defectuosos'

const DefectiveProductsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  idProd: {
    type: DataTypes.STRING,
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

class DefectiveProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Productos, { foreignKey: 'idProd' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DEFECTIVE_PRODUCTS_TABLE,
      modelName: DEFECTIVE_PRODUCTS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  DefectiveProducts,
  DefectiveProductsSchema,
  DEFECTIVE_PRODUCTS_TABLE
}
