const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Health Check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Product Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Category Routes
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);

// Coupon Routes
const couponRoutes = require('./routes/couponRoutes');
app.use('/api/coupons', couponRoutes);

// Customer Routes
const customerRoutes = require('./routes/customerRoutes');
app.use('/api/customers', customerRoutes);

// Order Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// User Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
})

module.exports = app;
