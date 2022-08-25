const config = require('../config/config.js')
const { removeImgCloudinary } = require('../libs/cloudinary.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/productos.service.js')
const { getAllSubsidiaries } = require('../services/sucursales.service.js')
const {
  addSubsidiaryProduct,
  updateSubsidiaryProduct,
  removeSubsidiaryProduct
} = require('../services/sucursalesProductos.service.js')
const { parseProduct, verifySubsidiaries } = require('../utils/dataHandler.js')
const { uploadImage } = require('../utils/imgHandler.js')

const msg = {
  notValid: 'Np se enviaron todas las sucursales',
  notFound: 'Producto no encontrado',
  delete: 'Producto eliminado'
}
const { DEFAULT_PRODUCT_IMG_URl } = config

const getAllProducts = async (req, res, next) => {
  try {
    const products = await services.getAllProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

const findProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await services.findProduct(id)

    if (!product) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const { body } = req

    let imgCloudinary = null
    const productParsed = parseProduct(body)
    const { stockProd, sucursales } = productParsed
    const subsidiaries = await getAllSubsidiaries()

    if (!verifySubsidiaries(subsidiaries, productParsed.sucursales))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    if (req.files?.imagenProd) {
      const { imagenProd } = req.files
      imgCloudinary = await uploadImage(imagenProd.tempFilePath)
    }

    productParsed.imagenProd = imgCloudinary
      ? imgCloudinary.secure_url
      : DEFAULT_PRODUCT_IMG_URl

    productParsed.idImgProd = imgCloudinary ? imgCloudinary.public_id : ''

    const product = await services.createProduct(productParsed)

    await addSubsidiaryProduct(product.dataValues.idProd, sucursales, stockProd)

    res.json(product)
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const productParsed = parseProduct(body)
    const { stockProd, sucursales } = productParsed
    const subsidiaries = await getAllSubsidiaries()
    let imgCloudinary = null

    const existProduct = await services.findProduct(id)
    if (!existProduct) return ERROR_RESPONSE.notFound(msg.notFound, res)

    if (!verifySubsidiaries(subsidiaries, productParsed.sucursales))
      return ERROR_RESPONSE.notAcceptable(msg.notValid, res)

    if (req.files?.imagenProd) {
      const { imagenProd } = req.files

      if (existProduct.idImgProd) {
        await removeImgCloudinary(existProduct.idImgProd)
      }

      imgCloudinary = await uploadImage(imagenProd.tempFilePath)
    }

    productParsed.imagenProd = imgCloudinary
      ? imgCloudinary.secure_url
      : existProduct.imagenProd
    productParsed.idImgProd = imgCloudinary
      ? imgCloudinary.public_id
      : existProduct.idImgProd

    const product = await services.updateProduct(id, productParsed)
    await updateSubsidiaryProduct(
      product.dataValues.idProd,
      sucursales,
      stockProd
    )

    res.json(product)
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    await removeSubsidiaryProduct(id)
    const product = await services.deleteProduct(id)

    if (!product) return ERROR_RESPONSE.notFound(msg.notFound, res)

    await removeImgCloudinary(product.idImgProd)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
