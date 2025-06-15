const express = require('express');
const router = express.Router();

// Import product controller functions
const productController = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products
router.get('/', productController.getAllProducts);

// @route   GET /api/products/search?q=keyword
// @desc    Search products by name (partial match)
router.get('/search', productController.searchProductsByName);

// @route   POST /api/products
// @desc    Create a new product
router.post('/', productController.createProduct);

// @route   POST /api/products/bulk
// @desc    Add products in bulk
router.post('/bulk', productController.bulkCreateProducts);

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
