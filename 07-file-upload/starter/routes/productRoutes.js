const express = require('express');
const routers = express.Router();

const {createProduct, getAllProducts} = require('../controllers/productController')
const {uploadProductImage} = require('../controllers/uploadsController')

routers.route('/').post(createProduct).get(getAllProducts);
routers.route('/uploads').post(uploadProductImage);

module.exports = routers;
