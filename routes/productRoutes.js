const express = require('express');
const router = express.Router();

// Import product controller functions
const productController = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products
router.get('/', productController.getAllProducts);

// @route   POST /api/products
// @desc    Create a new product
router.post('/', productController.createProduct);

// @route   GET /api/products/:id
// @desc    Get a product by ID
router.get('/:id', productController.getProductById);

// @route   PUT /api/products/:id
// @desc    Update a product by ID
router.put('/:id', productController.updateProduct);

// @route   DELETE /api/products/:id
// @desc    Soft delete a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
