const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a category by ID
router.get('/:id', categoryController.getCategoryById);

//get a category by name
router.get('/name/:name', categoryController.getCategoryByName);

// Create a new category
router.post('/', categoryController.createCategory);

// Update a category by ID
router.put('/:id', categoryController.updateCategory);

// Delete (soft delete) a category
router.delete('/:id', categoryController.deleteCategory);

//add cateogry in bulk
router.post('/bulk', categoryController.bulkCreateCategories);

module.exports = router;
