const verifyRoles = (allRoles, idRoles) => {
  const target = idRoles.map((rol) => rol.idRol)
  const allIdRoles = allRoles.map((rol) => rol.idRol)

  return target.every((rol) => allIdRoles.includes(rol))
}

const existClientRol = (allRoles, rolesUser) => {
  const idRolesUser = rolesUser.map((rol) => rol.idRol)

  const clientRol = allRoles.find((rol) => rol.nombreRol === rolesName.CLIENTE)

  return idRolesUser.includes(clientRol.idRol)
}

function parseProduct(product) {
  const { stockProd, precioCompra, precioVenta, fechaProd } = product

  product.stockProd = parseInt(stockProd)
  product.precioCompra = parseFloat(precioCompra)
  product.precioVenta = parseFloat(precioVenta)
  product.fechaProd = new Date(fechaProd)
  return product
}

const rolesName = {
  ADMINiSTRADOR: 'Administrador',
  EMPLEADO_VENTAS: 'Empleado de Ventas',
  CLIENTE: 'Cliente'
}

module.exports = { verifyRoles, rolesName, existClientRol, parseProduct }
