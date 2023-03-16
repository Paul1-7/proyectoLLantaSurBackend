const INVENTORY_REPORT_CRITERIA = [
  {
    id: '1',
    criteria: ''
  },
  {
    id: '2',
    criteria: ['nombre', 'ASC']
  },
  {
    id: '3',
    criteria: ['sucursalesProductos', 'stock', 'DESC']
  },
  {
    id: '4',
    criteria: ['categoria', 'nombre', 'ASC']
  },
  {
    id: '5',
    criteria: ['marca', 'nombre', 'ASC']
  },
  {
    id: '6',
    criteria: ['proveedor', 'nombre', 'ASC']
  }
]

const SALES_REPORT_ORDER_BY = [
  {
    id: '1',
    criteria: ['tipoVenta', 'DESC']
  },
  {
    id: '2',
    criteria: ['fecha', 'DESC']
  },
  {
    id: '3',
    criteria: ['vendedor', 'apellido', 'DESC']
  },
  {
    id: '4',
    criteria: ['total', 'DESC']
  }
]

const PURCHASES_REPORT_ORDER_BY = [
  {
    id: '2',
    criteria: ['fecha', 'DESC']
  },
  {
    id: '3',
    criteria: ['proveedor', 'nombre', 'DESC']
  },
  {
    id: '4',
    criteria: ['total', 'DESC']
  }
]

const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

module.exports = {
  INVENTORY_REPORT_CRITERIA,
  SALES_REPORT_ORDER_BY,
  PURCHASES_REPORT_ORDER_BY,
  emailRegex
}
