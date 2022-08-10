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
  deleteProduct
} = require('../services/productos.service.js')
const { uploadImage } = require('../utils/imgHandle.js')

const productsRoute = express.Router()
const { DEFAULT_PRODUCT_IMG_URL } = config

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
      const { imagenProd } = req.files

      let imgCloudinary = null
      const productNameExist = await findProductByName(body.nombreProd)

      if (productNameExist)
        return ERROR_RESPONSE.badRequest(msg.productNameExist, res)

      if (imagenProd) {
        imgCloudinary = await uploadImage(imagenProd.tempFilePath)
      }

      body.imagenProd = imgCloudinary?.secure_url || DEFAULT_PRODUCT_IMG_URL
      body.idImgProd = imgCloudinary?.public_id || null

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

    console.log(product)
    if (!product) return ERROR_RESPONSE.notFound(msg.notFound, res)

    await removeImgCloudinary(product.idImgProd)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
})

module.exports = productsRoute
