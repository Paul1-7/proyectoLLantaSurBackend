const services = require('../services/slidersImages.service.js')

const msg = {
  modifySuccess: 'Se actualizó los sliders correctamente'
}

const getAllSlidersImages = async (req, res, next) => {
  try {
    const sliders = await services.getAllSlidersImages()
    res.json(sliders)
  } catch (error) {
    next(error)
  }
}

const updateSlidersImages = async (req, res, next) => {
  try {
    const { sliders } = req.body
    await services.updateSlidersImages(sliders)
    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllSlidersImages,
  updateSlidersImages
}
