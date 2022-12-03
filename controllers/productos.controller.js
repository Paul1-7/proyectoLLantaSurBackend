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
  notValidSubsidiaries: 'No se enviaron todas las sucursales',
  notFound: 'Producto no encontrado',
  delete: 'se eliminó el producto correctamente',
  addSuccess: 'Se registró el producto correctamente',
  modifySuccess: 'Se actualizó el registró del producto correctamente'
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
    const { body, files } = req

    let imgCloudinary = null
    const productParsed = parseProduct(body)
    const { sucursales } = productParsed
    const subsidiaries = await getAllSubsidiaries()

    if (!verifySubsidiaries(subsidiaries, productParsed.sucursales))
      return ERROR_RESPONSE.notAcceptable(msg.notValidSubsidiaries, res)

    if (files?.imagen) {
      const { imagen } = files
      imgCloudinary = await uploadImage(imagen.tempFilePath)
    }

    productParsed.imagen = imgCloudinary
      ? imgCloudinary.secure_url
      : DEFAULT_PRODUCT_IMG_URl

    productParsed.idImg = imgCloudinary ? imgCloudinary.public_id : ''

    const product = await services.createProduct(productParsed)

    await addSubsidiaryProduct(product.dataValues.id, sucursales)

    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body, files } = req
    const productParsed = parseProduct(body)
    const { sucursales } = productParsed
    const subsidiaries = await getAllSubsidiaries()
    let imgCloudinary = null

    const existProduct = await services.findProduct(id)
    if (!existProduct) return ERROR_RESPONSE.notFound(msg.notFound, res)

    if (!verifySubsidiaries(subsidiaries, productParsed.sucursales))
      return ERROR_RESPONSE.notAcceptable(msg.notValidSubsidiaries, res)

    if (files?.imagen) {
      const { imagen } = files

      if (existProduct.idImg) {
        await removeImgCloudinary(existProduct.idImg)
      }

      imgCloudinary = await uploadImage(imagen.tempFilePath)
    }

    productParsed.imagen = imgCloudinary
      ? imgCloudinary.secure_url
      : existProduct.imagen

    productParsed.idImg = imgCloudinary
      ? imgCloudinary.public_id
      : existProduct.idImg

    await services.updateProduct(id, productParsed)
    await updateSubsidiaryProduct(id, sucursales)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params

    const existProduct = await services.findProduct(id)
    if (!existProduct) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const productDeleted = await services.deleteProduct(id)
    const { idImg } = existProduct

    if (productDeleted instanceof Error)
      return ERROR_RESPONSE.notAcceptable(productDeleted.message, res)
      
    await removeSubsidiaryProduct(id)
    idImg && (await removeImgCloudinary(idImg))

    res.json({ message: msg.delete, id })
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
