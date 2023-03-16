const config = {
  ISPROD: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  DEFAULT_PRODUCT_IMG_URl: process.env.DEFAULT_PRODUCT_IMG_URl,
  KEY_JWT: process.env.KEY_JWT,
  KEY_JWT_REFRESH: process.env.KEY_JWT_REFRESH
}

module.exports = config
