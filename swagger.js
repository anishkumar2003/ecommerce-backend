const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'API documentation of e-commerce backend',
  },
  host: 'localhost:5000',
  basePath: '',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

const outputFile = './swagger-output.json'; // Output file
const endpointsFiles = ['./app.js'];        // <--- This includes all your routes indirectly

swaggerAutogen(outputFile, endpointsFiles, doc);
