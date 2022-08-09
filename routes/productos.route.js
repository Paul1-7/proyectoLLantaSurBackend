const express = require('express')
const config = require('../config/config.js')
const { createProduct } = require('../services/productos.service.js')
const { uploadImage } = require('../utils/imgHandle.js')

const productsRoute = express.Router()
const { DEFAULT_PRODUCT_IMG_URL } = config

productsRoute.get('/', async (req, res, next) => {
  try {
    //const users = await getAllUsers()
    //const users = await service.getAllUsers()
    res.json('hola productos')
  } catch (error) {
    next(error)
  }
})

productsRoute.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const { imagenProd } = req.files
    let imgCloudinary = null

    if (imagenProd) {
      imgCloudinary = await uploadImage(imagenProd.tempFilePath)
    }

    body.imagenProd = imgCloudinary?.secure_url || DEFAULT_PRODUCT_IMG_URL
    body.idImg = imgCloudinary?.public_id || null

    const product = await createProduct(body)

    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = productsRoute
