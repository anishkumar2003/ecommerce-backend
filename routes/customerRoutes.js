const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

// Get all customers
router.get('/', customerController.getAllCustomers);

// Get a customer by ID
router.get('/:id', customerController.getCustomerById);

// Create a new customer
router.post('/', customerController.createCustomer);

// Update a customer by ID
router.put('/:id', customerController.updateCustomer);

// Delete (soft delete) a customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
