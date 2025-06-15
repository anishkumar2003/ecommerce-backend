const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

// Get all orders
router.get('/', orderController.getAllOrders);

// Get a specific order by ID
router.get('/:id', orderController.getOrderById);

// Create a new order
router.post('/', orderController.createOrder);

// Update an order (e.g., status or delivery)
router.put('/:id', orderController.updateOrder);

// Delete (soft delete) an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
