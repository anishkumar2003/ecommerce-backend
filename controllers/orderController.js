const Order = require('../models/order');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isDeleted: { $ne: true } }).populate('user items.product');
    res.status(200).json({ recordCount: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user items.product');
    if (!order || order.isDeleted) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { user, items, totalAmount, shippingAddress, paymentMethod, status, isPaid } = req.body;

    const newOrder = new Order({
      user,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status,
      isPaid
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

// Update an order (status, payment, etc.)
exports.updateOrder = async (req, res) => {
  try {
    const updates = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updates, {
      new: true
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
};

// Delete (soft delete) an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
