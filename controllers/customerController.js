const Customer = require('../models/customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ isDeleted: { $ne: true } });
    res.status(200).json({ recordCount: customers.length, customers });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer || customer.isDeleted) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Customer already exists with this email' });
    }

    const customer = new Customer({ name, email, phone, address });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating customer', error: error.message });
  }
};

// Update existing customer
exports.updateCustomer = async (req, res) => {
  try {
    const updates = req.body;
    const customer = await Customer.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer updated successfully', customer });
  } catch (error) {
    res.status(400).json({ message: 'Error updating customer', error: error.message });
  }
};

// Delete (soft delete) customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
