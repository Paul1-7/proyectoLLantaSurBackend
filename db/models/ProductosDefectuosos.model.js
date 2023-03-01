const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')
const { SUBSIDIARIES_TABLE } = require('./Sucursales.model.js')
const { SELLS_TABLE } = require('./Ventas.model.js')

const DEFECTIVE_PRODUCTS_TABLE = 'Productos_Defectuosos'

const DefectiveProductsSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    comment: 'identificador del registro',

    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4
    }
  },
  descripcion: {
    type: DataTypes.STRING,
    comment: 'descripcion del producto defectuoso',

    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    comment: 'cantidad del producto defectuoso',

    allowNull: false,
    validate: {
      isNumeric: msg.isNumeric,
      notNull: msg.notNull
    }
  },
  fecha: {
    type: DataTypes.DATE,
    comment: 'fecha de registro del producto defectuoso',

    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
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
  },
  idVenta: {
    type: DataTypes.STRING,
    comment: 'identificador de la venta',
    field: 'id_venta',
    allowNull: true,
    validate: {
      isUUID: 4
    },
    references: {
      model: SELLS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idSuc: {
    type: DataTypes.STRING,
    comment: 'identificador de la sucursal',
    field: 'id_suc',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: SUBSIDIARIES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class DefectiveProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Productos, { as: 'producto', foreignKey: 'idProd' })
    this.belongsTo(models.Sucursales, { as: 'sucursal', foreignKey: 'idSuc' })
    this.belongsTo(models.Ventas, { as: 'venta', foreignKey: 'idVenta' })
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
