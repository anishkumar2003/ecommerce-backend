const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Get a specific user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update user details
router.put('/:id', userController.updateUser);

// Delete (soft delete) a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
