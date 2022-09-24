const { findProduct } = require('../services/productos.service')
const {
  findProductsSubsidiaries
} = require('../services/sucursalesProductos.service')

/**
 * It returns true if all the elements in the targets array are included in the allData array
 * @param allData - an array of all the data in the database
 * @param targets - an array of strings that we want to check if they exist in the allData array
 * @returns A boolean value
 */
const areValidData = (allData, targets, idData, idTarget) => {
  const targetProducts = targets.map((value) => value[idTarget])
  const allIdProducts = allData.map((value) => value[idData])

  return targetProducts.every((item) => allIdProducts.includes(item))
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
  const areValid = allSubsidiaries.every((subsidiary) => {
    return bodySubsidiaries.includes(subsidiary.idSuc)
  })

  const isCorrectLength = allSubsidiaries.length === bodySubsidiaries.length

  return isCorrectLength && areValid
}

/**
 * It takes two arrays of objects, and returns a new array of objects with the same keys as the first
 * array, but with the values of the second array
 * @param allProduct - [{
 * @param bodyProducts - [{idProd: 1, cantidadDetVenta: 2}, {idProd: 2, cantidadDetVenta: 3}]
 * @returns An array of objects with the idSucProd and stockProd of the product.
 */
const getNewSubdiaryProduct = (allProduct, bodyProducts) => {
  return bodyProducts.map((product) => {
    const productFound = allProduct.find(
      (dataValues) => dataValues.idProd === product.idProd
    )

    // if (!productFound) {
    //   const productData = findProduct(product.idProd).then(data => data.toJSON())
    //   const {idSucProd} = productData.sucursales.
    //   return {
    //     ...product

    //    }
    // }

    const { idSucProd, stockProd, idSuc, idProd } = productFound

    const newStockProd = stockProd - product.cantidadDetVenta

    return {
      idSucProd,
      stockProd: newStockProd,
      idSuc,
      idProd
    }
  })
}

const getStockUpdated = (bodyProducts, oldSale) => {
  let newBodyProducts = bodyProducts.map((product) => {
    const oldProduct = oldSale.find(({ idProd }) => idProd === product.idProd)

    if (oldProduct) {
      const index = oldSale.findIndex(({ idProd }) => product.idProd === idProd)
      oldSale = oldSale.splice(index - 1, 1)
      return {
        ...product,
        cantidadDetVenta: product.cantidadDetVenta - oldProduct.cantidadDetVenta
      }
    } else return product
  })

  if (oldSale.length > 0) {
    oldSale = oldSale.map((item) => {
      return { ...item, cantidadDetVenta: -item.cantidadDetVenta }
    })
    return [...newBodyProducts, ...oldSale]
  } else return bodyProducts
}

const rolesName = {
  ADMINISTRADOR: 'Administrador',
  EMPLEADO_VENTAS: 'Empleado de Ventas',
  CLIENTE: 'Cliente'
}

module.exports = {
  areValidData,
  rolesName,
  existClientRol,
  parseProduct,
  verifySubsidiaries,
  getNewSubdiaryProduct,
  getStockUpdated
}
