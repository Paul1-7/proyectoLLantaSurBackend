const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/descuentos.service.js')
const {
  addDiscountsProduct,
  updateDiscountsProducts,
  removeDiscountsProducts
} = require('../services/descuentosProductos.service.js')
const { getProductsById } = require('../services/productos.service.js')

const msg = {
  notFound: 'Descuento no encontrado',
  notValid: 'La informacion no es correcta',
  delete: 'Descuento eliminado',
  addSuccess: 'Se registró el descuento correctamente',
  modifySuccess: 'Se actualizó el registró del descuento correctamente'
}

isValidMaxQuantityProduct = (productsData, products) => {
  const stocksProducts = products.map(({ sucursales }) => {
    return sucursales.map(
      ({ Sucursales_Productos }) => Sucursales_Productos.stock
    )
  })

  const maxQuantityProducts = stocksProducts.map((stocks) =>
    Math.max(...stocks)
  )

  return productsData.every(
    ({ cantMax }, index) => cantMax <= maxQuantityProducts[index]
  )
}

const getAllDiscounts = async (_, res, next) => {
  try {
    const discount = await services.getAllDiscounts()
    res.json(discount)
  } catch (error) {
    next(error)
  }
}

const findDiscount = async (req, res, next) => {
  try {
    const { id } = req.params
    const discount = await services.findDiscount(id)

    if (!discount) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(discount)
  } catch (error) {
    next(error)
  }
}

const createDiscount = async (req, res, next) => {
  try {
    const { productos, ...discountData } = req.body
    const idProducts = productos.map(({ idProd }) => idProd)
    const productsFounded = await getProductsById(idProducts)

    if (productsFounded.length !== idProducts.length)
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    if (!isValidMaxQuantityProduct(productos, productsFounded))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const newDiscount = await services.createDiscount(discountData)

    const newDiscountProduct = productos.map((product) => ({
      ...product,
      idDesc: newDiscount.id
    }))

    await addDiscountsProduct(newDiscountProduct)

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const updateDiscount = async (req, res, next) => {
  try {
    const { id } = req.params

    const discount = await services.findDiscount(id)
    if (!discount) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const { productos, ...discountData } = req.body
    const idProducts = productos.map(({ idProd }) => idProd)
    const productsFounded = await getProductsById(idProducts)

    if (productsFounded.length !== idProducts.length)
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    if (!isValidMaxQuantityProduct(productos, productsFounded))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    const newDiscount = await services.updateDiscount(id, discountData)

    const newDiscountProduct = productos.map((product) => ({
      ...product,
      idDesc: newDiscount.id
    }))

    await updateDiscountsProducts(id, newDiscountProduct)
    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const deleteDiscount = async (req, res, next) => {
  try {
    const { id } = req.params

    const discountFounded = await services.findDiscount(id)

    if (!discountFounded) return ERROR_RESPONSE.notFound(msg.notFound, res)

    await removeDiscountsProducts(id)
    await services.deleteDiscount(id)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllDiscounts,
  findDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount
}
