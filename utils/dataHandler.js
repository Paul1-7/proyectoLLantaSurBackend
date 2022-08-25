/**
 * It returns true if all the elements of the second array are included in the first array
 * @param allRoles - An array of objects that contains the idRol property.
 * @param idRoles - [{idRol: 1}, {idRol: 2}]
 * @returns A boolean value
 */
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

/**
 * It takes a product object, parses the stockProd, precioCompra, precioVenta, and fechaProd
 * properties, and returns the product object
 * @param product - The product object that we're going to parse.
 * @returns The product object is being returned.
 */
const parseProduct = (product) => {
  console.log(product)
  const { sucursales, stockProd, precioCompra, precioVenta, fechaProd } =
    product

  product.precioCompra = parseFloat(precioCompra)
  product.precioVenta = parseFloat(precioVenta)
  product.fechaProd = new Date(fechaProd)
  product.sucursales = sucursales.split(',')
  product.stockProd = stockProd.split(',')
  return product
}

/**
 * It checks if the subsidiaries in the body are valid and if they are the same length as the
 * subsidiaries in the database
 * @param allSubsidiaries - an array of objects, each object representing a subsidiary.
 * @param bodySubsidiaries - an array of subsidiary ids that the user wants to add to the product
 * @returns A boolean value.
 */
const verifySubsidiaries = (allSubsidiaries, bodySubsidiaries) => {
  const areValidSubsidiaries = allSubsidiaries.every((subsidiary) => {
    return bodySubsidiaries.includes(subsidiary.idSuc)
  })

  const isCorrectLength = allSubsidiaries.length === bodySubsidiaries.length

  return isCorrectLength && areValidSubsidiaries
}

const rolesName = {
  ADMINiSTRADOR: 'Administrador',
  EMPLEADO_VENTAS: 'Empleado de Ventas',
  CLIENTE: 'Cliente'
}

module.exports = {
  verifyRoles,
  rolesName,
  existClientRol,
  parseProduct,
  verifySubsidiaries
}
