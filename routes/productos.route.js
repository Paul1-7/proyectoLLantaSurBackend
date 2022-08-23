const express = require('express')
const fileUpload = require('express-fileupload')
const config = require('../config/config.js')
const { removeImgCloudinary } = require('../libs/cloudinary.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const {
  checkId,
  fileTypeCheck,
  fileSizeCheck
} = require('../middlewares/validator.handle.js')
const {
  createProduct,
  findProductByName,
  getAllProducts,
  deleteProduct,
  findProduct,
  updateProduct
} = require('../services/productos.service.js')
const { uploadImage } = require('../utils/imgHandler.js')

const productsRoute = express.Router()
const { DEFAULT_PRODUCT_IMG_URl } = config

const msg = {
  productNameExist: 'El nombre del producto ya existe',
  notFound: 'Producto no encontrado',
  delete: 'Producto eliminado'
}

function parseProduct(product) {
  const {
    stockProd,
    precioCompra,
    precioVenta,
    fechaProd,
    idProv,
    idMarca,
    idCat
  } = product

  product.stockProd = parseInt(stockProd)
  product.precioCompra = parseFloat(precioCompra)
  product.precioVenta = parseFloat(precioVenta)
  product.fechaProd = new Date(fechaProd)
  product.idProv = parseInt(idProv)
  product.idMarca = parseInt(idMarca)
  product.idCat = parseInt(idCat)

  return product
}

productsRoute.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

productsRoute.post(
  '/',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/img'
  }),
  fileTypeCheck,
  fileSizeCheck,
  async (req, res, next) => {
    try {
      const { body } = req

      let imgCloudinary = null
      const productNameExist = await findProductByName(body.nombreProd)

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
      const product = await createProduct(productParsed)

      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

productsRoute.delete('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await deleteProduct(id)

    if (!product) return ERROR_RESPONSE.notFound(msg.notFound, res)

    await removeImgCloudinary(product.idImgProd)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
})

productsRoute.put(
  '/:id',
  checkId,
  fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/img'
  }),
  fileTypeCheck,
  fileSizeCheck,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const { body } = req
      let imgCloudinary = null

      const existProduct = await findProduct(id)
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
      const product = await updateProduct(id, productParsed)

      delete product.dataValues.password
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = productsRoute
