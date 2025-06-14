const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // for parsing JSON bodies

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
