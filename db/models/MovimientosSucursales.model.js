const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')
const { SUBSIDIARIES_TABLE } = require('./Sucursales.model.js')
const { USER_TABLE } = require('./Usuarios.model.js')
const { PRODUCTS_TABLE } = require('./Productos.model.js')

const INTER_BRANCH_MOVEMENTS_TABLE = 'MovimientosSucursales'

const InterBranchMovementsSchema = {
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
  fecha: {
    comment: 'fecha de la venta',
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: msg.isDate,
      notNull: msg.notNull
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    comment: 'cantidad del producto',
    allowNull: false,
    validate: {
      notNull: msg.notNull
    }
  },
  idProd: {
    comment: 'identificador del producto ',
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
  },
  idSucOrigen: {
    comment: 'identificador de la sucursal de origen ',
    type: DataTypes.STRING,
    field: 'id_suc_origen',
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
  },
  idSucDestino: {
    comment: 'identificador de la sucursal de destino ',
    type: DataTypes.STRING,
    field: 'id_suc_destino',
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
  },
  idUsuario: {
    type: DataTypes.STRING,
    comment: 'identificador del usuario',

    field: 'id_usuario',
    allowNull: false,
    validate: {
      isUUID: 4
    },
    references: {
      model: USER_TABLE,
      key: 'id_usuario'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class InterBranchMovements extends Model {
  static associate(models) {
    this.belongsTo(models.Sucursales, {
      foreignKey: 'idSucDestino',
      targetKey: 'id',
      as: 'sucursalDestino'
    })
    this.belongsTo(models.Sucursales, {
      foreignKey: 'idSucOrigen',
      targetKey: 'id',
      as: 'sucursalOrigen'
    })
    this.belongsTo(models.Usuarios, {
      foreignKey: 'idUsuario',
      as: 'usuario'
    })
    this.belongsTo(models.Productos, {
      foreignKey: 'idProd',
      as: 'producto'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INTER_BRANCH_MOVEMENTS_TABLE,
      modelName: INTER_BRANCH_MOVEMENTS_TABLE,
      timestamps: false
    }
  }
}

module.exports = {
  InterBranchMovements,
  InterBranchMovementsSchema,
  INTER_BRANCH_MOVEMENTS_TABLE
}
