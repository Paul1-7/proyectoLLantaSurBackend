const config = require('../config/config.js')
const { removeImgCloudinary } = require('../libs/cloudinary.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/productos.service.js')
const { parseProduct } = require('../utils/dataHandler.js')
const { uploadImage } = require('../utils/imgHandler.js')

const msg = {
  productNameExist: 'El nombre del producto ya existe',
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
    const productNameExist = await services.findProductByName(body.nombreProd)

    if (productNameExist)
      return ERROR_RESPONSE.badRequest(msg.productNameExist, res)

    if (req.files?.imagenProd) {
      const { imagenProd } = req.files
      imgCloudinary = await uploadImage(imagenProd.tempFilePath)
    }

    body.imagenProd = imgCloudinary
      ? imgCloudinary.secure_url
      : DEFAULT_PRODUCT_IMG_URl

    body.idImgProd = imgCloudinary ? imgCloudinary.public_id : null
    const productParsed = parseProduct(body)
    const product = await services.createProduct(productParsed)

    res.json(product)
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    let imgCloudinary = null

    const existProduct = await services.findProduct(id)
    if (!existProduct) return ERROR_RESPONSE.notFound(msg.notFound, res)

    if (req.files?.imagenProd) {
      const { imagenProd } = req.files
      await removeImgCloudinary(existProduct.idImgProd)
      imgCloudinary = await uploadImage(imagenProd.tempFilePath)
    }

    body.imagenProd = imgCloudinary
      ? imgCloudinary.secure_url
      : existProduct.imagenProd
    body.idImgProd = imgCloudinary
      ? imgCloudinary.public_id
      : existProduct.idImgProd

    const productParsed = parseProduct(body)
    const product = await services.updateProduct(id, productParsed)

    delete product.dataValues.password
    res.json(product)
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
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
