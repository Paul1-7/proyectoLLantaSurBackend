const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')

const DEFECTIVE_PRODUCTS_TABLE = 'Productos_Defectuosos'

const DefectiveProductsSchema = {
  idProdDef: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    field: 'id_prod_def',
    validate: {
      isUUID: 4
    }
  },
  descProdDef: {
    type: DataTypes.STRING,
    field: 'desc_prod_def',
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  cantidadProdDef: {
    type: DataTypes.INTEGER,
    field: 'cantidad_prod_def',
    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  fechaProdDef: {
    type: DataTypes.DATE,
    field: 'fecha_prod_def',
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
      key: 'id_prod'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class DefectiveProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Productos, { foreignKey: 'id_prod' })
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
