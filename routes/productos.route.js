const express = require('express')
const fileUpload = require('express-fileupload')
const { ADMINISTRADOR } = require('../config/roles.js')
const {
  getAllProducts,
  findProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getDataToReport,
  getBestSellingProducts
} = require('../controllers/productos.controller.js')
const {
  checkId,
  fileTypeCheck,
  fileSizeCheck,
  checkBodyParams,
  verifyToken,
  checkRoles
} = require('../middlewares/validator.handle.js')

const productsRoute = express.Router()

productsRoute.get('/', getAllProducts)
productsRoute.get('/best-selling', getBestSellingProducts)
productsRoute.get(
  '/reportes/',
  [verifyToken, checkRoles(ADMINISTRADOR.id)],
  getDataToReport
)
productsRoute.get('/:id', checkId, findProduct)
productsRoute.post(
  '/',
  [
    verifyToken,
    checkRoles(ADMINISTRADOR.id),
    fileUpload({
      useTempFiles: true,
      tempFileDir: './tmp/img'
    }),
    checkBodyParams('sucursales'),
    fileTypeCheck,
    fileSizeCheck
  ],

  createProduct
)

productsRoute.delete(
  '/:id',
  [checkId, verifyToken, checkRoles(ADMINISTRADOR.id)],
  deleteProduct
)

productsRoute.put(
  '/:id',
  [
    checkId,
    verifyToken,
    checkRoles(ADMINISTRADOR.id),
    fileUpload({
      useTempFiles: true,
      tempFileDir: './tmp/img'
    }),
    fileTypeCheck,
    fileSizeCheck
  ],

  updateProduct
)

module.exports = productsRoute
