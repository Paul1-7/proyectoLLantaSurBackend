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

module.exports = { INVENTORY_REPORT_CRITERIA }
