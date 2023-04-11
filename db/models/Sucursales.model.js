const { Model, DataTypes } = require('sequelize')
const msg = require('../../utils/validationsMsg.js')

const SUBSIDIARIES_TABLE = 'Sucursales'

const SubsidiariesSchema = {
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
  nombre: {
    type: DataTypes.STRING,
    comment: 'nombre de la sucursal',

    unique: true,
    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  direccion: {
    type: DataTypes.STRING,
    comment: 'direccion de la sucursal',

    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  tel: {
    type: DataTypes.STRING,
    comment: 'telefono o celular de la sucursal',

    allowNull: false,
    validate: {
      is: msg.isAlphanumeric,
      notNull: msg.notNull
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    comment: 'estado de la sucursal',

    allowNull: false,
    defaultValue: 1,
    validate: {
      is: msg.isState
    }
  }
}

class Subsidiaries extends Model {
  static associate(models) {
    this.hasMany(models.Usuarios, { foreignKey: 'idSuc', as: 'usuarios' })
    this.belongsToMany(models.Productos, {
      through: models.SucursalesProductos,
      as: 'productos',
      foreignKey: 'idSuc',
      otherKey: 'idProd'
    })
    this.hasMany(models.SucursalesProductos, {
      as: 'sucursalesProductos',
      foreignKey: 'idSuc'
    })

    this.hasMany(models.Ventas, {
      foreignKey: 'idSuc',
      as: 'ventas'
    })

    this.hasMany(models.MovimientosSucursales, {
      foreignKey: 'idSucOrigen',
      sourceKey: 'id'
    })
    this.hasMany(models.MovimientosSucursales, {
      foreignKey: 'idSucDestino',
      sourceKey: 'id'
    })

    this.hasMany(models.ProductosDefectuosos, {
      foreignKey: 'idSuc',
      as: 'productosDefectuosos'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBSIDIARIES_TABLE,
      modelName: SUBSIDIARIES_TABLE,
      timestamps: false
    }
  }
}

module.exports = { Subsidiaries, SubsidiariesSchema, SUBSIDIARIES_TABLE }
