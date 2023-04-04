const { format } = require('date-fns')
const { CLIENTE } = require('../config/roles')

/**
 * It returns true if all the elements in the targets array are included in the allData array
 * @param allData - an array of all the data in the database
 * @param targets - an array of strings that we want to check if they exist in the allData array
 * @returns A boolean value
 */
const areValidData = (allData, targets, idData) => {
  const allIdData = allData.map((value) => value[idData])

  return targets.every((item) => allIdData.includes(item))
}

const existClientRol = (allRoles, rolesUser) => {
  const idRolesUser = rolesUser.map((rol) => rol.idRol)

  const clientRol = allRoles.find((rol) => rol.nombreRol === CLIENTE.name)

  return idRolesUser.includes(clientRol.idRol)
}

/**
 * It takes a product object, parses the stockProd, precioCompra, precioVenta, and fechaProd
 * properties, and returns the product object
 * @param product - The product object that we're going to parse.
 * @returns The product object is being returned.
 */
const parseProduct = (product) => {
  const { sucursales, precioCompra, precioVenta, fecha } = product

  product.precioCompra = parseFloat(precioCompra)
  product.precioVenta = parseFloat(precioVenta)
  product.fecha = new Date(fecha)
  product.sucursales = JSON.parse(sucursales)
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
  const isCorrectLength = allSubsidiaries.length === bodySubsidiaries.length

  if (!isCorrectLength) return false

  const idSubsidiaries = bodySubsidiaries.map(({ idSuc }) => idSuc)
  const areValid = allSubsidiaries.every((subsidiary) => {
    return idSubsidiaries.includes(subsidiary.id)
  })

  return areValid
}

/**
 * It takes two arrays of objects, and returns a new array of objects with the same keys as the first
 * array, but with the values of the second array
 * @param allProduct - [{
 * @param bodyProducts - [{idProd: 1, cantidadDetVenta: 2}, {idProd: 2, cantidadDetVenta: 3}]
 * @returns An array of objects with the idSucProd and stockProd of the product.
 */
const getNewStock = (allProduct, bodyProducts) => {
  return bodyProducts.map((product) => {
    const productFound = allProduct.find(
      (dataValues) => dataValues.idProd === product.idProd
    )
    const { id, stock, idSuc, idProd } = productFound
    const newStockProd = stock - product.cantidad

    return {
      id,
      stock: newStockProd,
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

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[áàäâå]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[.,]/g, '')
    .replace(/\s/g, '-')
}

function getDateUTC4() {
  const fecha = new Date()
  const zonaHoraria = fecha.getTimezoneOffset()
  fecha.setHours(fecha.getHours() - zonaHoraria / 60 + 4)

  return fecha
}

function generateCodeToDocuments(letter, secuencialNumber) {
  const numberPad = (secuencialNumber + 1).toString().padStart(4, '0')
  const today = format(new Date(), 'yyyyMMdd')
  return `${letter}-${today}-${numberPad}`
}

module.exports = {
  areValidData,
  existClientRol,
  parseProduct,
  verifySubsidiaries,
  getNewStock,
  getStockUpdated,
  normalizeText,
  getDateUTC4,
  generateCodeToDocuments
}
